import { registerPlugin } from "@capacitor/core";
import type {
  BackgroundGeolocationPlugin,
  CallbackError,
  WatcherOptions,
  Location,
} from "@capacitor-community/background-geolocation";

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  "BackgroundGeolocation"
);

function removeWatcher(id: string) {
  return BackgroundGeolocation.removeWatcher({ id });
}

function addWatcher(
  successCallback: (location: Location) => void,
  errorCallback: (error: CallbackError) => void = console.error,
  options: WatcherOptions = {}
) {
  return BackgroundGeolocation.addWatcher(
    {
      backgroundMessage: "Cancel to prevent battery drain.",
      backgroundTitle: "Tracking You.",
      requestPermissions: true,
      stale: false,
      distanceFilter: 1,
      ...options,
    },
    function callback(location, error) {
      if (error) {
        if (error.code === "NOT_AUTHORIZED") {
          if (
            window.confirm(
              "This app needs your location, " +
                "but does not have permission.\n\n" +
                "Open settings now?"
            )
          ) {
            BackgroundGeolocation.openSettings().catch(console.error);
          }
        }
        return errorCallback(error);
      }

      if (location) {
        return successCallback(location);
      }
    }
  );
}

function guessLocation(
  callback: (location: Location) => void,
  timeout: number
) {
  let last_location: Location | undefined;
  addWatcher(
    (location) => {
      last_location = location || undefined;
    },
    console.log,
    {
      requestPermissions: false,
      stale: true,
    }
  )
    .then((id) => {
      setTimeout(() => {
        if (last_location) {
          callback(last_location);
        }
        removeWatcher(id).catch(console.error);
      }, timeout);
    })
    .catch(console.error);
}

export { addWatcher, guessLocation, removeWatcher };
export type { Location };
