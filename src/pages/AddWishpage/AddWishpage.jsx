import cls from './AddWishpage.module.css';
import { Button } from '../../components/Button';

export const AddWishpage = () => {
  return (
    <> 
      <h2 className={cls.formTitle}>Добавить желание</h2>

      <form className={cls.formContainer} action="">
        <div className={cls.formControl}>
          <label htmlFor="wishField">Ваше желание</label>
          <textarea name="wish" id="wishField" cols="30" rows="2"  required></textarea>
        </div>   

        <div className={cls.formControl}>
          <label htmlFor="descField">Добавьте подробное описание</label>
          <textarea name="description" id="descField" cols="30" rows="10"></textarea>
        </div> 

        <div className={cls.formControl}>
          <label htmlFor="img">Добавьте то, как вы представляете себе вашу мечту</label>
          <input type="file" accept="image/*" id="img" />
        </div> 

        <Button>Добавить желание</Button>

      </form>
    </>
  );
};
