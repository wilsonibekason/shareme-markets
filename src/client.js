import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  //projectId: process.env.WEB2_CLOUD_SANITY_PROJECT_ID,
  projectId: "tjwellma",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  //token: process.env.WEB2_CLOUD_SANITY_API_KEY,
  token:
    "skjyHyGco1OeGnTocv5jhiYGq8RCEIlRdzQ4jhf0BNxCpI7h6uu0ZvmmAMxqbBzj23G728LFPPz3pyc5vsQmvIHRfEoAw4B8CFusaQ2CXUF9kFEQHefN2hgcSph4cmvIqqdiPJ9BCK7ayEvSyw5AKjdJwxeC4fRUZLnLuDVtcOUwuj33qbd4",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
