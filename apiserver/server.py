import os
import logging

from aiohttp import web


logger = logging.getLogger(__name__)
logging.basicConfig(format='[%(asctime)s] %(message)s', level=logging.INFO)


class Api:
    def __init__(self):
        with open('data.txt') as f:
            self.sh = list(set(f))

    async def get_answer(self, request):
        data = await request.post()
        q = data.get('q', '').strip()
        if not q:
            return self._fail('Empty request')
        return self._ok({'a': self.sh[hash(q) % len(self.sh)]})

    def _ok(self, data):
        data['ok'] = True
        return web.json_response(data)

    def _fail(self, error):
        return web.json_response({'ok': False, 'error': error})


handler = Api()
app = web.Application()
app.router.add_post('/api/get-answer', handler.get_answer)


if __name__ == '__main__':
    host = '0.0.0.0'
    port = 8080
    logger.info('Starting at http://%s:%s', host, port)
    web.run_app(app, host=host, port=port)
