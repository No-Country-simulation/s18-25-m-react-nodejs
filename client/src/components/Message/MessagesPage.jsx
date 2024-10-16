import { MessagePanel } from "../Message/MessagePanel";
import { MessageSidebar} from "../Message/MessageSidebar";
import { SimilarProfiles } from "../Message/SimilarProfile";

export const MessagesPage = () => {
    return (
      <div className="flex h-screen">
        <MessageSidebar />
        <MessagePanel />
        <SimilarProfiles />
      </div>
    );
  };
  
  export default MessagesPage;
  