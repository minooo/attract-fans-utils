import Loadable from "react-loadable";
import { Loading } from "0-components";

const loadPage = path =>
  Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
  });

const Home = loadPage("0-home");
const CreateTaskPoster = loadPage("1-create-task-poster");
const BaseInfoSet = loadPage("2-base-info-set");
const MemberJoinTip = loadPage("3-member-join-tip");
const FirstTaskOk = loadPage("4-first-task-ok");
const SecondTaskOk = loadPage("5-second-task-ok");
const ThirdTaskOk = loadPage("6-third-task-ok");
const MessageReply = loadPage("7-message-reply");
const PosterDetail = loadPage("8-poster-detail");

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/create-task-poster",
    component: CreateTaskPoster
  },
  {
    path: "/base-info-set_:id",
    component: BaseInfoSet
  },
  {
    path: "/member-join-tip_:id",
    component: MemberJoinTip
  },
  {
    path: "/first-task-ok_:id",
    component: FirstTaskOk
  },
  {
    path: "/second-task-ok_:id",
    component: SecondTaskOk
  },
  {
    path: "/third-task-ok_:id",
    component: ThirdTaskOk
  },
  {
    path: "/message-reply_:id",
    component: MessageReply
  },
  {
    path: "/poster-detail_:id",
    component: PosterDetail
  }
];
