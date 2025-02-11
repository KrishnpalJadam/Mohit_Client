// ** Next, React And Locals Imports
import MarqueeTopbar from "./Marquee/MarqueeTopbar";
import SimpleTopbar from "./Simple/SimpleTopbar";

export default function Topbar({ settings }) {
  return (
    <div>
      {settings?.topbarStyle === "marquee" && (
        <MarqueeTopbar settings={settings} />
      )}
      {settings?.topbarStyle === "simple" && (
        <SimpleTopbar settings={settings} />
      )}
    </div>
  );
}
