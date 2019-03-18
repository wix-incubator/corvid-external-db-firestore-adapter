<h1 align="center">
  NodeJS Firestore Connector Example
</h1>


This project is an example of a Firestore Connector for Wix Data external connectors. You can use this project as a basis for deploying your own connector to the Google AppEngine.

## Installation

In order to use this example, you need to define your own *configuration* and *schemas* for the connector. These settings will be deployed alongside your Node artifact on the engine of your choice.

### Cloning

To start off, clone this repository on your local machine:

```
git clone <repository url>
```

### Configuration

The configuration must be stored in a file `config.json` at the root of the package. This file is not present after cloning, so let's kick things off by creating one of your own.

The configuration is a JSON object that contains two **required** keys at the root:

* `googleServiceAccount` must contain the Google Service Account data that you can retrieve from the Google Cloud Platform Console ([see how here](https://cloud.google.com/iam/docs/creating-managing-service-accounts)).
* `secretKey` must contain the secret key that you will use when configuring the connector in the Wix Editor. Each request to your connector will contain this secret key under the *requestContext* key within the payload.

An example configuration can be found in `config.example.json` file.

### Schemas

The schemas must be stored in a file `schemas` at the root of the package. This file is not present after cloning, so let's create one.

The schemas configuration is a JSON object that contains an array of schemas that you want to enable.

An example configuration can be found in `schemas.example.json` file.

## Deployment

* Install the [Google Cloud SDK](https://cloud.google.com/sdk/) for your operating system;
* Acquire local credentials;

	```
	gcloud auth application-default login
	```
* Run deployment command in your connector project folder.

	```
	gcloud app deploy app.yaml
	```