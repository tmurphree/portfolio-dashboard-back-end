# escape=`

# escape=` MUST stay above the first comment to be inerpreted as a
# parser directive; it helps avoid insanity in Windows
# see https://docs.docker.com/engine/reference/builder/#escape

FROM node:10.15.0-alpine

WORKDIR /opt/app

# make a group (burros) and add new non-root user (myuser)
RUN addgroup burros
RUN adduser -S myuser -G burros

# When using COPY with more than one source file, 
# the destination must be a directory and end with a /
COPY package*.json ./

# Use docker cache to avoid having to copy thousands of files
# from node_modules
RUN npm install --only=production

COPY . .

# add the burros group to the ownership of the files & folders
RUN chown -R :burros /opt/app
# allow read and execute so myuser can run the file
RUN chmod -R 750 /opt/app

# use non-root user
USER myuser

CMD ["npm","start"]
