import Loadable from "react-loadable"
import { Loading } from "0-components"
const loadPage = path => Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
})

const ShieldingDetection = loadPage("0-shielding-detection")

export default [
    {
        path: "/shielding-detection",
        component: ShieldingDetection
    }
]
