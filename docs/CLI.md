# CLI

To use `pino-stackdriver` from the command line, you need to install it globally:

```bash
npm install -g pino-stackdriver
```

## Example

Given an application `foo` that logs via pino, a stackdriver log project `bar` and credentials in the file `/credentials.json`, you would use `pino-stackdriver` like so:

```bash
node foo | pino-stackdriver --project bar --credentials /credentials.json
```

## Usage

You can pass the following options via cli arguments:

| Short command | Full command | Description |
| ------------- | ------------ |-------------|
| -V | --version | Output the version number |
| -p | --project &lt;project&gt; | Your Google Cloud Platform project ID (or use env var PROJECT_ID) |
| -c | --credentials &lt;credentials&gt; | The file path of the JSON file that contains your service account key (or use env var GOOGLE_APPLICATION_CREDENTIALS). you can also use clientEmail and privateKey instead of the path. |
| -e | --clientEmail &lt;email&gt; | Client email, part of credentials object provided by Google |
| -g | --privateKey &lt;googleKey&gt; | Private key, part of credentials object provided by Google. |
| -k | --key &lt;key:customKey&gt; | Repeatable `key:customKey` pairs for custom keys (see [API docs](./API.md#keys))
| -n | --logName | The resource to send logs to. Defaults to `{"type": "global"}`.
| -r | --resource &lt;resourcejson&gt; | Resource to send the logs to, input in JSON (see [API docs](./API.md#resource))
| -h | --help | Output usage information |

See the [API](./API.md) documentation for details.
