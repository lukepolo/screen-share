import { ServiceProvider } from "varie";
import ChatService from "@app/services/ChatService";
import DeviceService from "@app/services/DeviceService";
import StreamController from "@app/streams/StreamController";
import BroadcastService from "@app/services/BroadcastService";
import DummyCaptureService from "@app/services/DummyCaptureService";
import CameraCaptureService from "@app/services/CameraCaptureService";
import RoomStreamingService from "@app/services/RoomStreamingService";
import DesktopCaptureService from "@app/services/DesktopCaptureService";
import OperatingSystemService from "@app/services/OperatingSystemService";
import MicrophoneCaptureService from "@app/services/MicrophoneCaptureService";

/*
|--------------------------------------------------------------------------
| App Service Provider
|--------------------------------------------------------------------------
| You can bind various items to the app here, or can create other
| custom providers that bind the container
|
*/
export default class AppProviderServiceProvider extends ServiceProvider {
  public async boot() {
    this.app.make<BroadcastService>("BroadcastService");
  }

  public async register() {
    this.app.singleton("BroadcastService", BroadcastService);

    // CHAT SERVICES
    this.app.bind("ChatService", ChatService);

    // OS SERVICES
    this.app.bind("DeviceService", DeviceService);
    this.app.bind("OperatingSystemService", OperatingSystemService);

    // STREAMING SERVICES
    this.app.bind("StreamController", StreamController);
    if ($config.get("app.platform") === "app") {
      const RemoteControlService = await import(
        "@app/services/RemoteControlService"
      );
      this.app.bind("RemoteControlService", RemoteControlService);
    }
    this.app.bind("RoomStreamingService", RoomStreamingService);

    // CAPTURE SERVICES
    this.app.bind("DummyCaptureService", DummyCaptureService);
    this.app.bind("CameraCaptureService", CameraCaptureService);
    this.app.bind("DesktopCaptureService", DesktopCaptureService);
    this.app.bind("MicrophoneCaptureService", MicrophoneCaptureService);
  }
}
