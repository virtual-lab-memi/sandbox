FROM ubuntu:trusty
RUN apt-get -y update && apt-get install -y build-essential
COPY ./read-only-files /home
WORKDIR /home
CMD ./execute.sh
