import styles from "./login.module.css";
export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles["centered-box"]}>
        <p className={styles["textLogin"]}>Register</p>
        <form>
          <label>Enter Email</label>
          <div className={styles["text-field"]}>
            <input type="text" name="Username/Email" />
          </div>

          <div>
            <label>Enter Password</label>
          </div>
          <div className={styles["text-field"]}>
            <input type="password" name="Password" />
          </div>
          <div>
            <label>Re-Enter Password</label>
          </div>
          <div className={styles["text-field"]}>
            <input type="password" name="Password" />
          </div>
          <div>
            <input
              type="submit"
              name="Register"
              value="Register"
              className={styles["loginButton"]}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
