import { MessagePanel } from "../Messages/MessagePanel";
import { MessageSidebar} from "../Messages/MessageSidebar";

export function Messages() {
  return (
    <div className="flex h-[500px] bg-gray-900 text-white"> {/* // en vez de [500px] puede ir screen */}
      <MessageSidebar />
      <MessagePanel />
    </div>
  );
}

export default Messages;
