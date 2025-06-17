import React, { useState } from "react";
import { Experiences } from "../../../service/apiService";
import { useNavigate } from "react-router-dom";

const experiencesService = new Experiences();

export default function FormDeleteExperience({id_experience}) {
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteExperience = async () => {
        const result = await experiencesService.deleteExperiences(id_experience)
        if (result) {
            setShowDeleteModal(false);
            navigate("/");
        } else {
            alert("Failed to delete experience");
        }

    }

    return (
        <div className="">
            <dialog id="success_modal" className={`modal ${showDeleteModal ? 'modal-open' : ''}`}>
                <div className="modal-box bg-warning text-black text-center p-8 rounded-lg shadow-lg">
                    <h2 className="font-bold text-2xl">Are you sure you want to Delete this Experience?</h2>
                    <p className="py-4 text-lg">If you delete the experience, all the information connected
                        will be lost.</p>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary text-white px-6 py-2 rounded-lg"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            NO
                        </button>
                        <button
                            className="btn btn-secondary text-black px-6 py-2 rounded-lg"
                            onClick={handleDeleteExperience}
                        >
                            YES
                        </button>
                    </div>
                </div>
            </dialog>
            <div className="card-body p-0 flex items-center justify-center">
                <button className="btn btn-neutral text-error-content w-full" onClick={() => {setShowDeleteModal(true)} }>Delete this Experience</button>
            </div>
        </div>
    );
}