import { Service } from "typedi";
import { ExpressRoute } from "./ExpressRoute";
import { Router } from "express";
import { MonitoringRoute } from "./MonitoringRoute";
import { RoomsService } from "../../services/RoomsService";
import ensureLoggedIn from "../middleware/ensureLoggedIn";

@Service()
export class ApiRoute implements ExpressRoute {
  constructor(private readonly monitoringRoute: MonitoringRoute, private readonly roomsService: RoomsService) {}

  public router(): Router {
    const router = Router();

    router.use("/monitoring", this.monitoringRoute.router());

    router.get("/rooms", ensureLoggedIn, (req, res) => {
      res.json(this.roomsService.getAllRooms());
    });

    return router;
  }
}