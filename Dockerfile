FROM node:12.17.0

RUN mkdir heacet-com
WORKDIR /heacet-com

RUN yarn global add gatsby-cli