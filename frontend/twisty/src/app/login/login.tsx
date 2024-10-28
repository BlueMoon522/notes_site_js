//text,email,password,submit in the type are predefined
import styles from "./login.module.css";
export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles["centered-box"]}>
        <p className={styles["textLogin"]}>Login</p>
        <form>
          <label>Enter Email</label>
          <div className={styles["text-field"]}>
            <input type="text" name="Username/Email" />
          </div>
          <div>
            <label>Password</label>
          </div>
          <div className={styles["text-field"]}>
            <input type="password" name="Password" />
          </div>
          <div>
            <input
              type="submit"
              name="Login"
              value="Login"
              className={styles["loginButton"]}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
