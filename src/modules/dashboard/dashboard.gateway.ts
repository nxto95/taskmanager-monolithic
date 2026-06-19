import { WebSocketGateway } from '@nestjs/websockets';
import { DashboardService } from './dashboard.service';

@WebSocketGateway()
export class DashboardGateway {
  constructor(private readonly dashboardService: DashboardService) {}
}
