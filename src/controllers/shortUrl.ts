import express from "express";
import { urlModel } from "../models/shortUrl";
import { ExpressRequestBody, ExpressResponseData } from "../types";

const createUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { fullUrl } = req.body;
    console.log("Full Url is: ", fullUrl);
    const urlFound = await urlModel.find({ fullUrl: fullUrl });
    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl: fullUrl });
      res.status(201).send({
        data: {
          message: "Short Url Created succesfully!",
          success: true,
          shortUrl: shortUrl,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      success: false,
      data: {},
    });
  }
};

const getAllUrl = async (req: express.Request, res: express.Response) => {
  try {
    // TODO: Add pagination for fetching all url's
    const shortUrls = await urlModel.find();

    if (shortUrls.length < 0) {
      res
        .status(404)
        .send({ message: "Short Urls Not found!", success: false, data: {} });
    } else {
      res.status(200).send({
        message: "URLs fetched succesfully",
        success: true,
        data: shortUrls,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      success: false,
      data: {},
    });
  }
};

const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const shortUrl = await urlModel.findOne({ shortUrl: id });

    if (!shortUrl) {
      res.status(404).send({
        success: false,
        message: "Url not found!",
        data: {},
      });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(shortUrl.fullUrl);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      success: false,
      data: {},
    });
  }
};

const deleteUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const shortUrl = await urlModel.findByIdAndDelete({ _id: id });

    if (shortUrl) {
      res.status(204).send({
        success: false,
        message: "Url deleted succesfully!",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
      success: false,
      data: {},
    });
  }
};

export { createUrl, getAllUrl, getUrl, deleteUrl };
