# escape=`

# escape=` MUST stay above the first comment to be inerpreted as a
# parser directive; it helps avoid insanity in Windows
# see https://docs.docker.com/engine/reference/builder/#escape

FROM node:10.15.0-alpine

WORKDIR /opt/app

# When using COPY with more than one source file, 
# the destination must be a directory and end with a /
COPY package*.json ./

# Use docker cache to avoid having to copy thousands of files
# from node_modules
RUN npm install --only=production

COPY . .

# make non-root user: alpine
RUN adduser -D myuser

# use non-root user
USER myuser

CMD ["npm","start"]