import { signIn } from "next-auth/react";

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
    });

    if (res?.error) {
        setError(res.error);
    } else {
        router.push("/account"); // Redirect on success
    }

    setLoading(false);
};
