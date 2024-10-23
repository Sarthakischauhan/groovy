"use client"

import { useState } from "react";

const useModal = () => {
    const [currentMode, setCurrentMode] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleModal = (status: boolean, mode:string) => {
        setIsActive(status)
        setCurrentMode(mode)
    }


    return { currentMode, handleModal, isActive, setIsActive};
}

export default useModal;