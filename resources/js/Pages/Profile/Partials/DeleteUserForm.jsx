import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section dir="rtl" className={`space-y-6 ${className}`}>
            <header dir="rtl">
                <h2 className="text-2xl font-bold text-red-600">حذف الحساب</h2>

                <p className="mt-2 text-gray-500 leading-relaxed">
                    سيتم حذف الحساب نهائياً مع جميع البيانات المرتبطة به ولا
                    يمكن التراجع عن هذه العملية.
                </p>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="

rounded-2xl

px-8

py-3

text-base

"
            >
                حذف الحساب نهائياً
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
هل أنت متأكد من حذف الحساب؟                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        سيتم حذف جميع بيانات الحساب بشكل نهائي ولا يمكن استعادتها لاحقاً.

يرجى إدخال كلمة المرور لتأكيد العملية.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="كلمة المرور"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="

mt-2

block

w-full

rounded-2xl

border-gray-200

focus:border-red-500

focus:ring-red-500

"
                            isFocused
                            placeholder="كلمة المرور"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
onClick={closeModal}
>

إلغاء

</SecondaryButton>

<DangerButton
className="ms-3"

disabled={processing}
>

تأكيد حذف الحساب

</DangerButton>

                    </div>
                </form>
            </Modal>
        </section>
    );
}
