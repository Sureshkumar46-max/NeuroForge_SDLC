import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import WorkspaceLayout from "../components/WorkspaceLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { companySizeOptions, industryOptions } from "../data/module2Data";
import { useWorkspace } from "../context/WorkspaceContext";
import axios from "axios";

function CreateOrganization() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: industryOptions[0],
    companySize: companySizeOptions[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description) {
      setError("Organization name and description are required.");
      return;
    }

    try {
      const token = sessionStorage.getItem("nf_token");

      const response = await axios.post(
        "http://localhost:8080/api/orgs",
        {
          name: form.name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const org = response.data;

      console.log("Backend Response =", response.data);
      console.log("Organization ID =", response.data.id);

      setSubmitted(true);

      setTimeout(() => {
        navigate(`/organizations/details/${org.id}`);
      }, 600);

    } catch (err) {
      console.error(err);
      setError("Failed to create organization");
    }
  };


  return (
    <WorkspaceLayout
      title="Create organization"
      subtitle="Define the enterprise container for your teams, members and delivery work."
      pageClassName="create-organization-page"
    >
      <Card title="Organization details">
        <form onSubmit={handleSubmit}>
          {submitted && <div className="success-text">Organization created successfully. Redirecting to organization details...</div>}
          {error && <div className="error-text">{error}</div>}
          <div className="form-grid">
            <div className="full-width">
              <Input
                label="Organization name"
                name="name"
                placeholder="e.g. Northstar Labs"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Summarize the mission, operating model and delivery focus of this organization."
              />
            </div>
            <div>
              <label htmlFor="industry">Industry</label>
              <select id="industry" name="industry" value={form.industry} onChange={handleChange}>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="companySize">Company size</label>
              <select id="companySize" name="companySize" value={form.companySize} onChange={handleChange}>
                {companySizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="full-width">
              <label htmlFor="logo">Logo upload</label>
              <div className="upload-box upload-browse-box">
                <div>
                  <strong>Upload organization logo</strong>
                  <span>PNG, JPG or SVG from your device</span>
                </div>
                <input id="logo" className="upload-input" type="file" accept="image/*" />
                <label className="upload-browse-btn" htmlFor="logo">Browse</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/organizations">
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit">Create organization</Button>
          </div>
        </form>
      </Card>
    </WorkspaceLayout>
  );
}

export default CreateOrganization;
