import React, { useEffect, useState } from "react";
import { TextField, SelectField } from "../../components/FormFields";
import Table from "../../components/Table";
import { Button } from "../../components/Buttons";
import ConfirmationModal from "../../components/ConfirmationModal";
import StatusModal from "../../components/StatusModal";
import editSvg from "../../assets/edit.svg";
import viewSvg from "../../assets/view.svg";
import deleteSvg from "../../assets/deleteAction.svg";
import reloadSvg from "../../assets/reload.svg";
import { useFormik } from "formik";
import { fpoCapitalValidationSchema } from "./validation";
import {
  listCapitalDetails,
  createCapitalDetails,
  updateCapitalDetails,
  deleteCapitalDetails,
  getCapitalDetailsById,
} from "../../api/FpoCapitalUpdate";

/* ================= Currency Helpers (Indian Format) ================= */
// Keep only digits (removes commas, spaces, currency symbols)
const stripToDigits = (val) => (val ?? "").toString().replace(/[^\d]/g, "");

// Format digits as Indian currency grouping (5,00,000)
const formatINR = (val) => {
  const digits = stripToDigits(val);
  if (!digits) return "";
  return new Intl.NumberFormat("en-IN").format(Number(digits));
};

// Convert "5,00,000" => 500000
const parseINRToNumber = (val) => {
  const digits = stripToDigits(val);
  return digits ? Number(digits) : 0;
};

const displayINR = (n) => {
  if (n === null || n === undefined || isNaN(Number(n))) return "-";
  return new Intl.NumberFormat("en-IN").format(Number(n));
};

const nowTimestamp = () =>
  new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

/* ================= Yes/No Helper (for table display) ================= */
const toYesNo = (val) => {
  // Normalize common variants coming from API/back-end
  if (val === true || val === 1 || val === "1" || val === "Y" || val === "Yes") return "Yes";
  if (val === false || val === 0 || val === "0" || val === "N" || val === "No") return "No";
  return "-";
};

export const Capital = () => {
  const initialCapitalData = {
    totalEquity: "",
    isGrantReceived: "",
    grantReceived: "",
  };

  const [capitalList, setCapitalList] = useState([]);
  const [deletedCapitalList, setDeletedCapitalList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ success: true, message: "" });
  const [pendingAction, setPendingAction] = useState(null);

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: initialCapitalData,
    validationSchema: fpoCapitalValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const fetchCapitalList = () => {
    const res = listCapitalDetails(1); // fpoId = 1
    if (res?.success) setCapitalList(res.data ?? []);
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchCapitalList();
  }, []);

  /* ================= HANDLERS ================= */
  const handleReset = () => {
    formik.resetForm();
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      // mark touched for all errors
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }
    setPendingAction(isEditMode ? "update" : "add");
    setIsConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false);

    const payload = {
      fpoId: 1,
      totalFpoEquityCap: parseINRToNumber(formik.values.totalEquity),
      isEquityGrant: formik.values.isGrantReceived === "Yes",
      fpoEquityGrantAmt:
        formik.values.isGrantReceived === "Yes"
          ? parseINRToNumber(formik.values.grantReceived)
          : 0,
    };

    try {
      if (pendingAction === "add") {
        const res = await createCapitalDetails(payload);
        if (res?.status === 200 && res?.data?.success) {
          setStatusConfig({ success: true, message: "FPO Capital details added successfully." });
          fetchCapitalList();
        } else {
          setStatusConfig({ success: false, message: res?.data?.message || "Create failed" });
        }
      } else if (pendingAction === "update") {
        const res = await updateCapitalDetails(editingId, payload);
        if (res?.status === 200 && res?.data?.success) {
          setStatusConfig({ success: true, message: "FPO Capital details updated successfully." });
          fetchCapitalList();
        } else {
          setStatusConfig({ success: false, message: res?.data?.message || "Update failed" });
        }
      } else if (pendingAction === "delete") {
        // Capture row for deleted table BEFORE removal
        const deletingRow = capitalList.find((x) => x.id === editingId);
        const res = await deleteCapitalDetails(editingId);

        if (res?.status === 200 && res?.data?.success) {
          // remove from top list
          setCapitalList((prev) => prev.filter((item) => item.id !== editingId));

          // append to deleted list with timestamp
          if (deletingRow) {
            setDeletedCapitalList((prev) => [
              {
                id: Date.now(),
                "Total FPO Equity Capital(in Rupees)": displayINR(deletingRow.totalFpoEquityCap),
                "Whether Equity Grant Received?": deletingRow.isEquityGrant ? "Yes" : "No",
                "FPO Equity Grant Received(in Rupees)": displayINR(deletingRow.fpoEquityGrantAmt),
                "Deleted on (Timestamp)": nowTimestamp(),
              },
              ...prev,
            ]);
          }

          setStatusConfig({ success: true, message: "FPO Capital details deleted successfully." });
        } else {
          setStatusConfig({ success: false, message: res?.data?.message || "Delete failed" });
        }
      }
    } catch (e) {
      setStatusConfig({ success: false, message: "Unexpected error occurred." });
    }

    setIsStatusOpen(true);
    handleReset();
  };

  const handleEdit = async (row) => {
    setIsEditMode(true);
    setEditingId(row.id);

    const res = await getCapitalDetailsById(row.id);

    if (res?.status === 200 && res?.data?.success && res?.data?.data) {
      const data = res.data.data;
      formik.setValues({
        totalEquity: formatINR(data.totalFpoEquityCap),
        isGrantReceived: data.isEquityGrant ? "Yes" : "No",
        grantReceived: formatINR(data.fpoEquityGrantAmt),
      });
    } else {
      // fallback to row
      formik.setValues({
        totalEquity: formatINR(row.totalFpoEquityCap),
        isGrantReceived: row.isEquityGrant ? "Yes" : "No",
        grantReceived: formatINR(row.fpoEquityGrantAmt),
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setEditingId(id);
    setPendingAction("delete");
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-10">
      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <h2 className="text-base font-bold text-grey-900 mb-6">FPO Capital Update Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TextField
            type="text"
            label="Total FPO Equity Capital (in Rupees)"
            name="totalEquity"
            placeholder="Enter Value"
            required
            value={formik.values.totalEquity}
            onChange={(e) => formik.setFieldValue("totalEquity", formatINR(e.target.value))}
            onBlur={(e) => formik.setFieldValue("totalEquity", formatINR(e.target.value))}
            error={formik.errors.totalEquity}
            touched={formik.touched.totalEquity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SelectField
            label="Whether Equity Grant Received?"
            name="isGrantReceived"
            required
            value={formik.values.isGrantReceived}
            onChange={(e) => {
              formik.handleChange(e);
              // If user switches to No, clear grantReceived to avoid stale values
              if (e.target.value === "No") {
                formik.setFieldValue("grantReceived", "");
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.errors.isGrantReceived}
            touched={formik.touched.isGrantReceived}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </SelectField>

          {formik.values.isGrantReceived === "Yes" ? (
            <TextField
              type="text"
              label="FPO Equity Grant Received(in Rupees)"
              name="grantReceived"
              value={formik.values.grantReceived}
              placeholder="Enter Value"
              required
              onChange={(e) => formik.setFieldValue("grantReceived", formatINR(e.target.value))}
              onBlur={(e) => formik.setFieldValue("grantReceived", formatINR(e.target.value))}
              error={formik.errors.grantReceived}
              touched={formik.touched.grantReceived}
            />
          ) : (
            <TextField
              type="text"
              label="FPO Equity Grant Received(in Rupees)"
              name="grantReceived"
              value=""
              placeholder="Enter Value"
              disabled={true}
            />
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
          <Button
            buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
            onClick={handleReset}
          >
            <img src={reloadSvg} alt="Reset" className="w-4 h-4" />
            Reset Form
          </Button>

          <Button
            buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
            onClick={handleSave}
          >
            {isEditMode ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      {/* ================= MAIN TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <h3 className="text-base font-bold text-grey-900 mb-6">FPO Capital Details View Table</h3>

        <Table
          columns={[
            "Total FPO Equity Capital(in Rupees)",
            "Whether Equity Grant Received?",
            "FPO Equity Grant Received(in Rupees)",
            "Actions",
          ]}
          data={capitalList.map((row) => ({
            ...row,
            "Total FPO Equity Capital(in Rupees)": displayINR(row.totalFpoEquityCap),
            // ✅ FIX: Convert boolean/variant -> Yes/No for display
            "Whether Equity Grant Received?": toYesNo(row.isEquityGrant),
            "FPO Equity Grant Received(in Rupees)": displayINR(row.fpoEquityGrantAmt),
          }))}
          renderActions={(row) => (
            <div className="flex items-center justify-center gap-4">
			{/*<img
                src={editSvg}
                alt="Edit"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleEdit(row)}
              />
			<img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />*/}
              <img
                src={deleteSvg}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDelete(row.id)}
              />
            </div>
          )}
          // ✅ Text only (“Yes/No”)
          renderColumn={(col, value) => {
            if (col === "Whether Equity Grant Received?") {
              return <div className="text-center font-medium">{value ?? "-"}</div>;
            }
            return value;
          }}
        />
      </div>

      {/* ================= DELETED TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <h3 className="text-lg font-semibold text-grey-900 mb-6">Deleted FPO Capital Details</h3>

        <Table
          columns={[
            "Total FPO Equity Capital(in Rupees)",
            "Whether Equity Grant Received?",
            "FPO Equity Grant Received(in Rupees)",
            "Deleted on (Timestamp)",
          ]}
          data={deletedCapitalList}
          renderColumn={(col, value) => {
            // Keeping deleted table behavior unchanged (it currently shows icons),
            // but you can switch this too to text-only if needed.
            if (col === "Whether Equity Grant Received?") {
              const boolVal = value === "Yes"; // deleted table stores Yes/No
              return (
                <div className="flex justify-center">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      boolVal ? "bg-success-100 text-success" : "bg-danger-100 text-danger"
                    }`}
                  >
                    {boolVal ? "✓" : "✕"}
                  </span>
                </div>
              );
            }
            return value;
          }}
        />
      </div>

      {/* ================= MODALS ================= */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={pendingAction === "delete" ? "Delete Record" : isEditMode ? "Update Record" : "Save Record"}
        description={
          pendingAction === "delete"
            ? "Are you sure you want to delete this record?"
            : `Are you sure you want to ${isEditMode ? "update" : "save"} these details?`
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