FROM node
ENV PWD /root
COPY . /root/
RUN cd /root/; npm install
EXPOSE 3000
CMD ["node", "/root/index.js"]
