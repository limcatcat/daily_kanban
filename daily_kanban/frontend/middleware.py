from django.contrib.auth.middleware import AuthenticationMiddleware

class DebugAuthenticationMiddleware(AuthenticationMiddleware):
    def process_request(self, request):
        super().process_request(request)
        print(f"Debug Middleware: request.user -> {request.user}")