import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const request = context.switchToHttp().getRequest();
                console.log(`URL: ${request.url}`);
                console.log(`Tempo de execução: ${Date.now() - now}ms`);
            })
        );
}
}