FROM docker.mci.dev/node:16-alpine as build_stage
WORKDIR /usr/src/app

ARG REPO_READONLY_USERNAME
ARG REPO_READONLY_PASSWORD

COPY package.json .
COPY .env .
COPY yarn.lock .
COPY .yarnrc.yml .

COPY tsconfig.json .

RUN yarn --version

RUN yarn config set registry https://repo.mci.dev/artifactory/api/npm/npm/
RUN yarn config set _auth "$REPO_READONLY_USERNAME:$REPO_READONLY_PASSWORD"

RUN yarn 
#RUN yarn add --dev @babel/plugin-proposal-private-property-in-object@7.20.5


COPY . ./
RUN yarn build

# deploy
FROM docker.mci.dev/nginx:stable-alpine as prod_stage
COPY --from=build_stage /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
