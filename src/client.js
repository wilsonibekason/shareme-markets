import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  //projectId: process.env.WEB2_CLOUD_SANITY_PROJECT_ID,
  projectId: "tjwellma",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: process.env.WEB2_CLOUD_SANITY_API_KEY,
  //token:
    //"skPE4rqlby0lPJ7iqWlYvN9qg1iqELAhSFZVY11BD5gxGOvew1vp7Vb1Bs2c9nSBwNMLCMdBbEkS4Rq2r5YxhK9BLA4wMcrLv24kupfyOUqXVoyhmYLbBNNdmF7QYJffXtG1Y5k4UdRl5UwxRJZ6cpW5yjGracx1dVvvBq0oSfpanYPVlyuu",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
