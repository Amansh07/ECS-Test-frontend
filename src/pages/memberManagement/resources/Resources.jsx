/* Resources.jsx – fixed: no duplicates, correct row after save, delete removes only one */
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { TextField, RadioGroup, SelectField } from "../../../components/FormFields";
import Table from "../../../components/Table";
import { Button } from "../../../components/Buttons";
import ConfirmationModal from "../../../components/ConfirmationModal";
import StatusModal from "../../../components/StatusModal";
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { resourceMembersValidationSchema } from "../validation";
import { resourceMembersAPI } from "../../../api/resourceMembersMock";

export const Resources = () => {
  /* ================= STATES ================= */
  const initialResourceMemberForm = {
    fpoId: 1,
    resourceName: "",
    resourcefatherName: "",
    designation: "",
    gender: "",
    email: "",
    mobile: "",
    district: "",
    block: "",
  };

  const [tableData, setTableData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusConfig, setStatusConfig] = useState({ success: true, message: "" });
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: initialResourceMemberForm,
    validationSchema: resourceMembersValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  /* ================= HELPERS ================= */
  const toInt = (v) => {
    if (v === undefined || v === null || v === "") return null;
    const n = parseInt(String(v), 10);
    return Number.isNaN(n) ? null : n;
  };

  const cloneRows = (rows) =>
    Array.isArray(rows) ? rows.map((r) => ({ ...r })) : [];

  /* ================= API FUNCTIONS ================= */
  const fetchResourceMembers = async () => {
    try {
      setLoading(true);
      const response = await resourceMembersAPI.getList(1);
      // IMPORTANT: clone to break reference with mock API internal array
      const cloned = cloneRows(response?.data);
      setTableData(cloned);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setTableData([
        {
          id: 1,
          resourceName: "Fallback User",
          fatherHusbandName: "Fallback Father",
          gender: 3,
          emailAddress: "fallback@example.com",
          mobileNo: 9876543210,
          district: 0,
          block: 0,
          designationId: null,
        },
      ]);
      setStatusConfig({ success: false, message: "Using fallback data" });
      setIsStatusOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaveClicked(true);
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      setFormErrors(errors);
      setIsSaveClicked(false);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fpoId: 1,
        resourceName: (formik.values.resourceName || "").trim(),
        fatherHusbandName: (formik.values.resourcefatherName || "").trim(),
        gender:
          formik.values.gender === "Male" ? 1 : formik.values.gender === "Female" ? 2 : 3,
        emailAddress: (formik.values.email || "").trim(),
        mobileNo: toInt(formik.values.mobile),
        district: toInt(formik.values.district),
        block: toInt(formik.values.block),
        designationId: toInt(formik.values.designation),
      };

      if (isEditMode && editingId) {
        await resourceMembersAPI.update(editingId, payload);
        setStatusConfig({ success: true, message: "Resource member updated successfully." });
      } else {
        // NO OPTIMISTIC PREPEND — let the source of truth (API) update,
        // then refetch the fresh list to avoid duplicates.
        await resourceMembersAPI.create(payload);
        setStatusConfig({ success: true, message: "Resource member added successfully." });
      }

      // Always refetch after create/update so UI exactly matches API
      await fetchResourceMembers();
      handleResetFormOnly();
    } catch (error) {
      console.error("❌ Save failed:", error);
      setStatusConfig({ success: false, message: error?.message || "Save failed" });
    } finally {
      setLoading(false);
      setIsSaveClicked(false);
      setIsStatusOpen(true);
    }
  };

  const handleEditClick = (row) => {
    const src = row?.__raw ?? row; // supports both adapted row & raw row
    setIsEditMode(true);
    setEditingId(src.id);
    formik.setValues({
      resourceName: src.resourceName || "",
      resourcefatherName: src.fatherHusbandName || "",
      designation: src.designationId ? String(src.designationId) : "",
      gender: src.gender === 1 ? "Male" : src.gender === 2 ? "Female" : "Other",
      email: src.emailAddress || "",
      mobile: src.mobileNo ? String(src.mobileNo) : "",
      district: src.district ? String(src.district) : "",
      block: src.block ? String(src.block) : "",
    });
  };

  const handleDelete = (idOrRow) => {
    const id = typeof idOrRow === "object" ? (idOrRow.__raw?.id ?? idOrRow.id) : idOrRow;
    setEditingId(id);
    setPendingAction("delete");
    setIsConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false);
    try {
      await resourceMembersAPI.delete(editingId);
      // Refetch to reflect the source of truth
      await fetchResourceMembers();
      setStatusConfig({ success: true, message: "Resource member deleted successfully." });
    } catch (error) {
      console.error("❌ Delete failed:", error);
      setStatusConfig({ success: false, message: "Delete failed" });
    }
    setIsStatusOpen(true);
  };

  // Reset ONLY the form & flags.
  const handleResetFormOnly = () => {
    formik.resetForm();
    setFormErrors({});
    setIsEditMode(false);
    setEditingId(null);
  };

  /* ================= Formik EFFECTS ================= */
  useEffect(() => {
    (async () => {
      const errors = await formik.validateForm();
      setFormErrors(errors);
    })();
  }, [formik.values]);

  useEffect(() => {
    if (!isSaveClicked) return;
    (async () => {
      const errors = await formik.validateForm();
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) {
        formik.setTouched(
          Object.keys(errors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );
        setIsSaveClicked(false);
      }
    })();
  }, [isSaveClicked]);

  useEffect(() => {
    fetchResourceMembers();
    // If you use React.StrictMode in dev, this will run twice; but we always clone and overwrite state, so it's safe.
  }, []);

  /* ================= ADAPTER for Table ================= */
  const TABLE_COLUMNS = useMemo(
    () => [
      "Employee Name",
      "Father's/Husband's Name",
      "Designation",
      "Gender",
      "Email Address",
      "Mobile Number",
      "District",
      "Block",
      "Actions",
    ],
    []
  );

  const uiRows = useMemo(
    () =>
      (Array.isArray(tableData) ? tableData : []).map((r) => ({
        "Employee Name": r?.resourceName ?? "",
        "Father's/Husband's Name": r?.fatherHusbandName ?? "",
        "Designation": r?.designationId ? `ID: ${r.designationId}` : "",
        "Gender":
          r?.gender === 1 ? "Male" : r?.gender === 2 ? "Female" : r?.gender === 3 ? "Other" : "",
        "Email Address": r?.emailAddress ?? "",
        "Mobile Number": r?.mobileNo ?? "",
        "District": r?.district ?? "",
        "Block": r?.block ?? "",
        __raw: r, // original row preserved for actions/edit
      })),
    [tableData]
  );

  /* ================= RENDER ================= */
  return (
    <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-white">
      <h2 className="text-base font-bold mb-6">FPO Employee Form</h2>

      {/* Form Fields */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Employee Name"
            required
            name="resourceName"
            placeholder="Enter Employee Name"
            value={formik.values.resourceName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.resourceName}
            touched={formik.touched.resourceName}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Father's/Husband's Name"
            required
            name="resourcefatherName"
            placeholder="Father's/Husband's Name"
            value={formik.values.resourcefatherName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.resourcefatherName}
            touched={formik.touched.resourcefatherName}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Designation"
            required
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.designation}
            touched={formik.touched.designation}
          >
            <option value="">Select Designation</option>
            <option value="5">CEO</option>
            <option value="6">Accountant</option>
            <option value="7">Labour Manager</option>
            <option value="8">Others</option>
            <option value="9">Member</option>
          </SelectField>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-4">
          <RadioGroup
            label="Gender"
            required
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.gender}
            touched={formik.touched.gender}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
          />
        </div>
      </div>

      {/* Email + Mobile */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Email"
            required
            name="email"
            placeholder="Enter Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.email}
            touched={formik.touched.email}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Mobile Number"
            required
            name="mobile"
            placeholder="Enter Mobile Number"
            type="tel"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formErrors.mobile}
            touched={formik.touched.mobile}
          />
        </div>
      </div>

      {/* District + Block */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        {["district", "block"].map((field) => {
          const formattedField = field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          return (
            <div key={field} className="col-span-12 md:col-span-6">
              <SelectField
                label={formattedField}
                required
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formErrors[field]}
                touched={formik.touched[field]}
              >
                <option value="">Select {formattedField}</option>
                {field === "district" ? (
                  <>
                    <option value="101">District 101</option>
                    <option value="102">District 102</option>
                  </>
                ) : (
                  <>
                    <option value="201">Block 201</option>
                    <option value="202">Block 202</option>
                  </>
                )}
              </SelectField>
            </div>
          );
        })}
      </div>

      <hr className="border border-stroke-200 my-4" />

      {/* Buttons */}
      <div className="h-[64px] flex justify-end gap-4 items-center">
        <button
          type="button"
          onClick={handleResetFormOnly}
          disabled={loading}
          className="
            border border-primary
            text-primary
            rounded-lg
            w-[95px] h-[43px]
            text-sm font-medium
            hover:bg-primary-50
            disabled:opacity-50
          "
        >
          Reset Form
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading || isSaveClicked}
          className="
            rounded-lg
            w-[96px] h-[43px]
            text-sm font-medium
            bg-success
            text-text-light
            hover:bg-success-600
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : isEditMode ? "Update" : "Save"}
        </button>
      </div>

      <hr className="border border-stroke-200 my-4" />

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-base font-medium my-4 text-text-dark">
          Employee Detail Form
        </h2>

        <Table
          columns={[
            "Employee Name",
            "Father's/Husband's Name",
            "Designation",
            "Gender",
            "Email Address",
            "Mobile Number",
            "District",
            "Block",
            "Actions",
          ]}
          data={useMemo(
            () =>
              (Array.isArray(tableData) ? tableData : []).map((r) => ({
                "Employee Name": r?.resourceName ?? "",
                "Father's/Husband's Name": r?.fatherHusbandName ?? "",
                "Designation": r?.designationId ? `ID: ${r.designationId}` : "",
                "Gender":
                  r?.gender === 1
                    ? "Male"
                    : r?.gender === 2
                      ? "Female"
                      : r?.gender === 3
                        ? "Other"
                        : "",
                "Email Address": r?.emailAddress ?? "",
                "Mobile Number": r?.mobileNo ?? "",
                "District": r?.district ?? "",
                "Block": r?.block ?? "",
                __raw: r,
              })),
            [tableData]
          )}
          loading={loading}
          renderActions={(row) => {
            const src = row?.__raw ?? row;
            return (
              <div className="flex items-center justify-center gap-4">
                <img
                  src={editSvg}
                  alt="Edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEditClick(row)}
                />
                <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                <img
                  src={deleteSvg}
                  alt="Delete"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(src?.id)}
                />
              </div>
            );
          }}
          renderColumn={(col, value, row) => {
            if (col === "Actions") return null; // Actions handled above
            const cell = value ?? row?.[col];
            return cell !== undefined && cell !== null && cell !== "" ? String(cell) : "-";
          }}
        />
      </div>

      {/* MODALS */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={
          pendingAction === "delete"
            ? "Delete Record"
            : pendingAction?.charAt(0)?.toUpperCase() + pendingAction?.slice(1) + " Record"
        }
        description={
          pendingAction === "delete"
            ? "Are you sure you want to delete this record?"
            : `Are you sure you want to ${pendingAction} these details?`
        }
      />

      <StatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={statusConfig.success}
        message={statusConfig.message}
      />
    </div>
  );
};