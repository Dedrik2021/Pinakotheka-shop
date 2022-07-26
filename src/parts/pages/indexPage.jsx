import { lazy } from "react";

const Home = lazy(() => import ("./HomePage"));
const SinglePainting = lazy(() => import ('../pages/SinglePainting'));
const Error404 = lazy(() => import ('../pages/Error-404'));
const MainLayout = lazy(() => import ('./layouts/MainLayout'));
const AboutAuthor = lazy(() => import ('./AboutAuthor'));
const News = lazy(() => import ('./NewsPage'));
const SingleNews = lazy(() => import ('./SingleNewsPage'));
const Authors = lazy(() => import ('./AuthorsPage'));
const UserCart = lazy(() => import ('./UserCartPage'));
const UserAccount = lazy(() => import ('./UserAccountPage'));
const UserLikes = lazy(() => import ('./UserLikesPage'));
const ForgottenPassword = lazy(() => import ('./ForgottenPasswordPage'));

export {
    Home,
    SinglePainting,
    Error404,
    MainLayout,
    AboutAuthor,
    News,
    SingleNews,
    Authors,
    UserAccount,
    UserCart,
    UserLikes,
    ForgottenPassword
}