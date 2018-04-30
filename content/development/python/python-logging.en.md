---
title: Logs with Python
author: Jose OC
date: 2018-03-13T00:00:00+00:00
draft: true
categories:
  - Coding

---

Logging is thread safe.

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console':{
            'level':'DEBUG',
            'class':'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'foo': {
            'handlers':['console'],
            'propagate': True,
            'level':'INFO',
        },
    }
}

logging.config.dictConfig(LOGGING)
logger = logging.getLogger('foo')
```
