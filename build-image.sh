sudo docker build -t train-me-sandbox . 
sudo docker create --name official-sandbox-2 --privileged -v /home/dann2/train-me/sandbox/output-data:/tmp/files train-me-sandbox
#apt-get install asciidoc
git clone https://github.com/dmeneses/isolate.git
cd isolate
make
cp isolate ../read-only-files/

