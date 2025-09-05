import { Router } from "express";
import { getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress ,reverseGeocode} from "../../controller/user-address-controller";
import { protect } from "../../middleware/auth-middleware";


const router:Router=Router();

router.post('/',protect,createUserAddress);
router.get('/',protect,getUserAddress);
router.put('/:addressId',protect,updateUserAddress);
router.delete('/:addressId',protect,deleteUserAddress);
router.post('/reverse-geocode',protect,reverseGeocode);

export default router as Router;