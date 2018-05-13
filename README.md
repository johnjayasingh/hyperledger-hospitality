~/fabric-dev-servers/startFabric.sh
composer network install -c PeerAdmin@hlfv1-a ./network/hospitality.bna
composer network start --networkName hospitality --networkVersion 1.0.0 -A admin -S adminpw -c PeerAdmin@hlfv1

npm start