import time

async def log_requests(req, call_next):
    start_time = time.time()
    response = await call_next(req)
    duration = time.time() - start_time
    print(f"{req.method} {req.url.path} - {response.status_code} - {duration:.3f}s")
    return response