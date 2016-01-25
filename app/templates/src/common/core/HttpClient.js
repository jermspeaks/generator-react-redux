import request from 'superagent';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const getUrl = path => {
  if (path.startsWith('http')) {
    return path;
  } else if (ExecutionEnvironment.canUseDOM) {
    return path;
  } else if (process.env.WEBSITE_HOSTNAME) {
    return `http://${process.env.WEBSITE_HOSTNAME}${path}`;
  }
  return `http://127.0.0.1:${global.server.get('port')}${path}`;
};

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  })

};

export default HttpClient;
