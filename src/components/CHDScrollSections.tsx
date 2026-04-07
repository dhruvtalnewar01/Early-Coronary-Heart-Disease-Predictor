"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface AnalysisResult {
    status: string;
    biomarker_analysis: any;
    imaging_analysis: any;
    ecg_analysis: any;
    clinical_scores: any;
    risk_assessment: any;
    intervention_plan: any;
    clinical_report: any;
    errors: string[];
    agent_trace: any[];
    patient_info: any;
}

/* ─── Section 1: Patient Intake ─────────────────────────────────────────── */
function PatientIntakeSection({ onAnalyze, isAnalyzing }: { onAnalyze: (data: any) => void; isAnalyzing: boolean }) {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", dob: "", sex: "male", ethnicity: "",
        height: "", weight: "", smoking: "never", diabetes: "none",
        hypertension: false, familyHistory: false,
        ldl: "", hdl: "", totalChol: "", triglycerides: "",
        crpHs: "", troponinI: "", hba1c: "", fastingGlucose: "",
    });

    const bmi = formData.height && formData.weight
        ? (parseFloat(formData.weight) / ((parseFloat(formData.height) / 100) ** 2)).toFixed(1)
        : "—";

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formData.firstName || !formData.lastName || !formData.dob) {
            alert("Please fill in at least First Name, Last Name, and Date of Birth.");
            return;
        }
        onAnalyze(formData);
    };

    const inputClass = "w-full bg-black/60 border border-gray-700/60 rounded px-3 py-2.5 text-sm text-white font-mono placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-colors";
    const labelClass = "block text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-1.5 font-semibold";

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl w-full">
                <div className="flex items-center space-x-4 mb-3">
                    <div className="w-10 h-[1px] bg-cyan-500/60" />
                    <span className="text-[10px] text-cyan-400 tracking-[0.3em] uppercase font-bold">Section 01</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[0.08em] uppercase mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    Patient Intake <span className="text-cyan-400">Protocol</span>
                </h2>
                <p className="text-sm text-gray-400 font-mono mb-10 tracking-wide">Demographic profiling · Lifestyle indexing · Biomarker ingestion</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 p-6 border border-gray-800/50 rounded-lg bg-black/30 backdrop-blur-sm">
                        <h3 className="text-xs text-amber-500 tracking-[0.3em] uppercase font-bold mb-4">Patient Demographics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className={labelClass}>First Name</label><input className={inputClass} placeholder="John" value={formData.firstName} onChange={e => handleChange("firstName", e.target.value)} /></div>
                            <div><label className={labelClass}>Last Name</label><input className={inputClass} placeholder="Doe" value={formData.lastName} onChange={e => handleChange("lastName", e.target.value)} /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className={labelClass}>Date of Birth</label><input type="date" className={inputClass} value={formData.dob} onChange={e => handleChange("dob", e.target.value)} /></div>
                            <div><label className={labelClass}>Biological Sex</label><select className={inputClass} value={formData.sex} onChange={e => handleChange("sex", e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></div>
                            <div><label className={labelClass}>Ethnicity</label><input className={inputClass} placeholder="White" value={formData.ethnicity} onChange={e => handleChange("ethnicity", e.target.value)} /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className={labelClass}>Height (cm)</label><input type="number" className={inputClass} placeholder="175" value={formData.height} onChange={e => handleChange("height", e.target.value)} /></div>
                            <div><label className={labelClass}>Weight (kg)</label><input type="number" className={inputClass} placeholder="80" value={formData.weight} onChange={e => handleChange("weight", e.target.value)} /></div>
                            <div><label className={labelClass}>BMI (computed)</label><div className="w-full bg-black/60 border border-gray-700/60 rounded px-3 py-2.5 text-sm font-mono text-cyan-400">{bmi}</div></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className={labelClass}>Smoking Status</label><select className={inputClass} value={formData.smoking} onChange={e => handleChange("smoking", e.target.value)}><option value="never">Never</option><option value="former">Former</option><option value="current">Current</option></select></div>
                            <div><label className={labelClass}>Diabetes</label><select className={inputClass} value={formData.diabetes} onChange={e => handleChange("diabetes", e.target.value)}><option value="none">None</option><option value="type1">Type 1</option><option value="type2">Type 2</option></select></div>
                        </div>
                        <div className="flex gap-6 mt-2">
                            <label className="flex items-center gap-2 text-xs text-gray-400 font-mono cursor-pointer"><input type="checkbox" className="accent-cyan-500" checked={formData.hypertension} onChange={e => handleChange("hypertension", e.target.checked)} /> Hypertension</label>
                            <label className="flex items-center gap-2 text-xs text-gray-400 font-mono cursor-pointer"><input type="checkbox" className="accent-red-500" checked={formData.familyHistory} onChange={e => handleChange("familyHistory", e.target.checked)} /> Family CHD History</label>
                        </div>
                    </div>

                    <div className="space-y-4 p-6 border border-gray-800/50 rounded-lg bg-black/30 backdrop-blur-sm">
                        <h3 className="text-xs text-red-400 tracking-[0.3em] uppercase font-bold mb-4">Biomarker Panel Entry</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className={labelClass}>LDL (mg/dL)</label><input type="number" className={inputClass} placeholder="130" value={formData.ldl} onChange={e => handleChange("ldl", e.target.value)} /></div>
                            <div><label className={labelClass}>HDL (mg/dL)</label><input type="number" className={inputClass} placeholder="45" value={formData.hdl} onChange={e => handleChange("hdl", e.target.value)} /></div>
                            <div><label className={labelClass}>Total Chol (mg/dL)</label><input type="number" className={inputClass} placeholder="220" value={formData.totalChol} onChange={e => handleChange("totalChol", e.target.value)} /></div>
                            <div><label className={labelClass}>Triglycerides</label><input type="number" className={inputClass} placeholder="160" value={formData.triglycerides} onChange={e => handleChange("triglycerides", e.target.value)} /></div>
                            <div><label className={labelClass}>hs-CRP (mg/L)</label><input type="number" className={inputClass} placeholder="2.5" value={formData.crpHs} onChange={e => handleChange("crpHs", e.target.value)} /></div>
                            <div><label className={labelClass}>Troponin I (ng/mL)</label><input type="number" className={inputClass} placeholder="0.02" value={formData.troponinI} onChange={e => handleChange("troponinI", e.target.value)} /></div>
                            <div><label className={labelClass}>HbA1c (%)</label><input type="number" className={inputClass} placeholder="5.8" value={formData.hba1c} onChange={e => handleChange("hba1c", e.target.value)} /></div>
                            <div><label className={labelClass}>Fasting Glucose</label><input type="number" className={inputClass} placeholder="100" value={formData.fastingGlucose} onChange={e => handleChange("fastingGlucose", e.target.value)} /></div>
                        </div>
                        <button onClick={handleSubmit} disabled={isAnalyzing}
                            className={`w-full mt-4 py-3 text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-all duration-300 shadow-lg ${isAnalyzing ? "bg-gray-700 cursor-wait shadow-none" : "bg-gradient-to-r from-cyan-600/80 to-cyan-500/60 hover:from-cyan-500 hover:to-cyan-400 shadow-cyan-500/20 cursor-pointer"}`}>
                            {isAnalyzing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    AI Analysis wait 30-60s
                                </span>
                            ) : "Initialize Analysis Pipeline →"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="p-12 border border-gray-800/50 rounded-lg bg-black/30 text-center">
            <div className="text-3xl mb-3 opacity-30">🔬</div>
            <p className="text-sm text-gray-600 font-mono">{message}</p>
        </div>
    );
}

/* ─── Section 2: Biomarker ──────────────────────────────────────────────── */
function BiomarkerSection({ result, formData }: { result: AnalysisResult | null; formData: any }) {
    if (!result) return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-6xl w-full">
                <SectionHeader num="02" title="Biomarker" accent="Intelligence" color="red" subtitle="Lipid profiling · Inflammatory cascade · Cardiac injury markers" />
                <EmptyState message="Run analysis pipeline to view biomarker intelligence" />
            </div>
        </section>
    );

    const bio = result.biomarker_analysis || {};
    // Build markers from the form data (what user entered) + AI status from analysis
    const refRanges: Record<string, { unit: string; ref: string; optimal: number; inverse?: boolean }> = {
        ldl_cholesterol: { unit: "mg/dL", ref: "< 100", optimal: 100 },
        hdl_cholesterol: { unit: "mg/dL", ref: "> 60", optimal: 60, inverse: true },
        total_cholesterol: { unit: "mg/dL", ref: "< 200", optimal: 200 },
        triglycerides: { unit: "mg/dL", ref: "< 150", optimal: 150 },
        crp_hs: { unit: "mg/L", ref: "< 1.0", optimal: 1.0 },
        troponin_i: { unit: "ng/mL", ref: "< 0.04", optimal: 0.04 },
        hba1c: { unit: "%", ref: "< 5.7", optimal: 5.7 },
        fasting_glucose: { unit: "mg/dL", ref: "< 100", optimal: 100 },
    };
    const niceNames: Record<string, string> = {
        ldl_cholesterol: "LDL Cholesterol", hdl_cholesterol: "HDL Cholesterol",
        total_cholesterol: "Total Cholesterol", triglycerides: "Triglycerides",
        crp_hs: "hs-CRP", troponin_i: "Troponin I", hba1c: "HbA1c", fasting_glucose: "Fasting Glucose",
    };
    const formFieldMap: Record<string, string> = {
        ldl_cholesterol: "ldl", hdl_cholesterol: "hdl", total_cholesterol: "totalChol",
        triglycerides: "triglycerides", crp_hs: "crpHs", troponin_i: "troponinI",
        hba1c: "hba1c", fasting_glucose: "fastingGlucose",
    };

    // Get abnormal biomarkers from AI analysis
    const aiAbnormals = bio.top_abnormal_biomarkers || [];

    const markers = Object.entries(refRanges).map(([key, info]) => {
        const formKey = formFieldMap[key];
        const val = formData?.[formKey] ? parseFloat(formData[formKey]) : null;
        if (val === null || isNaN(val)) return null;

        // Check AI analysis for status
        const aiMatch = aiAbnormals.find((a: any) => a.name?.toLowerCase().includes(niceNames[key].toLowerCase().split(' ')[0]));
        let status = "Normal";
        let color = "bg-emerald-500";
        let statusColor = "text-emerald-400";

        if (info.inverse) {
            if (val < info.optimal * 0.67) { status = "Low"; color = "bg-red-500"; statusColor = "text-red-400"; }
            else if (val < info.optimal) { status = "Borderline Low"; color = "bg-amber-500"; statusColor = "text-amber-400"; }
            else { status = "Optimal"; }
        } else {
            if (val > info.optimal * 1.5) { status = "High"; color = "bg-red-500"; statusColor = "text-red-400"; }
            else if (val > info.optimal) { status = "Borderline High"; color = "bg-amber-500"; statusColor = "text-amber-400"; }
            else { status = "Optimal"; }
        }

        if (aiMatch?.severity) {
            const sev = aiMatch.severity.toLowerCase();
            if (sev.includes("critical") || sev.includes("high") || sev.includes("elevated")) { status = aiMatch.severity; color = "bg-red-500"; statusColor = "text-red-400"; }
            else if (sev.includes("borderline") || sev.includes("moderate")) { status = aiMatch.severity; color = "bg-amber-500"; statusColor = "text-amber-400"; }
        }

        const pct = info.inverse
            ? Math.min(95, Math.max(5, (val / (info.optimal * 1.5)) * 100))
            : Math.min(95, Math.max(5, (val / (info.optimal * 2)) * 100));

        return { name: niceNames[key], value: val, unit: info.unit, ref: info.ref, pct, color, status, statusColor, significance: aiMatch?.clinical_significance || "" };
    }).filter(Boolean);

    const narrative = bio.narrative || bio.clinical_summary || bio.summary || "";
    const lipidGrade = bio.lipid_profile_grade || "";
    const inflammTier = bio.inflammatory_risk_tier || "";
    const metabolicSyn = bio.metabolic_syndrome;

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-6xl w-full">
                <SectionHeader num="02" title="Biomarker" accent="Intelligence" color="red" subtitle="Lipid profiling · Inflammatory cascade · Cardiac injury markers" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {markers.map((m: any, i: number) => (
                        <div key={i} className="p-4 border border-gray-800/50 rounded-lg bg-black/40 backdrop-blur-sm hover:border-gray-600/60 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] text-gray-500 tracking-[0.15em] uppercase font-semibold">{m.name}</span>
                                <span className={`text-[9px] font-bold tracking-wider ${m.statusColor}`}>{m.status}</span>
                            </div>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-2xl font-bold text-white">{m.value}</span>
                                <span className="text-xs text-gray-500 font-mono">{m.unit}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                                <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: `${m.pct}%` }} />
                            </div>
                            <span className="text-[9px] text-gray-600 font-mono">Ref: {m.ref}</span>
                            {m.significance && <p className="text-[9px] text-gray-500 mt-2 italic">{m.significance}</p>}
                        </div>
                    ))}
                </div>
                {/* AI Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {lipidGrade && (
                        <div className="p-4 border border-gray-800/50 rounded-lg bg-black/40">
                            <span className="text-[9px] text-gray-500 tracking-widest uppercase block mb-1">Lipid Profile Grade</span>
                            <span className={`text-lg font-bold ${lipidGrade.includes("high") || lipidGrade.includes("very") ? "text-red-400" : lipidGrade === "optimal" ? "text-emerald-400" : "text-amber-400"}`}>{lipidGrade.toUpperCase().replace("_", " ")}</span>
                        </div>
                    )}
                    {inflammTier && (
                        <div className="p-4 border border-gray-800/50 rounded-lg bg-black/40">
                            <span className="text-[9px] text-gray-500 tracking-widest uppercase block mb-1">Inflammatory Risk</span>
                            <span className={`text-lg font-bold ${inflammTier === "high" ? "text-red-400" : inflammTier === "moderate" ? "text-amber-400" : "text-emerald-400"}`}>{inflammTier.toUpperCase()}</span>
                        </div>
                    )}
                    {metabolicSyn !== undefined && (
                        <div className="p-4 border border-gray-800/50 rounded-lg bg-black/40">
                            <span className="text-[9px] text-gray-500 tracking-widest uppercase block mb-1">Metabolic Syndrome</span>
                            <span className={`text-lg font-bold ${metabolicSyn ? "text-red-400" : "text-emerald-400"}`}>{metabolicSyn ? "DETECTED" : "NOT DETECTED"}</span>
                        </div>
                    )}
                </div>
                {narrative && (
                    <div className="p-5 border border-cyan-500/20 rounded-lg bg-black/40"><p className="text-xs text-gray-300 font-mono leading-relaxed">{narrative}</p></div>
                )}
            </div>
        </section>
    );
}

/* ─── Section Header helper ─────────────────────────────────────────────── */
function SectionHeader({ num, title, accent, color, subtitle }: { num: string; title: string; accent: string; color: string; subtitle: string }) {
    const c: Record<string, string> = { red: "text-red-400 bg-red-500/60", amber: "text-amber-400 bg-amber-500/60", emerald: "text-emerald-400 bg-emerald-500/60", cyan: "text-cyan-400 bg-cyan-500/60", purple: "text-purple-400 bg-purple-500/60" };
    const parts = (c[color] || c.cyan).split(" ");
    return (
        <>
            <div className="flex items-center space-x-4 mb-3"><div className={`w-10 h-[1px] ${parts[1]}`} /><span className={`text-[10px] ${parts[0]} tracking-[0.3em] uppercase font-bold`}>Section {num}</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[0.08em] uppercase mb-2">{title} <span className={parts[0]}>{accent}</span></h2>
            <p className="text-sm text-gray-400 font-mono mb-10 tracking-wide">{subtitle}</p>
        </>
    );
}

/* ─── Section 3: Imaging ────────────────────────────────────────────────── */
function ImagingSection({ result }: { result: AnalysisResult | null }) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]); };
    const imaging = result?.imaging_analysis;

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl w-full">
                <SectionHeader num="03" title="Imaging" accent="Analysis" color="amber" subtitle="CT Coronary Angiography · Calcium Scoring · Plaque Morphology" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileRef.current?.click()}
                        className="border-2 border-dashed border-gray-700/50 rounded-lg p-12 flex flex-col items-center justify-center bg-black/30 hover:border-amber-500/40 transition-colors cursor-pointer group min-h-[300px]">
                        <input ref={fileRef} type="file" accept="image/*,.dcm" className="hidden" onChange={e => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0]); }} />
                        {uploadedFile ? (
                            <><div className="text-4xl text-amber-400 mb-4">✓</div><p className="text-sm text-amber-400 font-mono text-center font-bold">{uploadedFile.name}</p><p className="text-[10px] text-gray-600 mt-2">({(uploadedFile.size / 1024).toFixed(1)} KB)</p></>
                        ) : (
                            <><div className="text-4xl text-gray-600 group-hover:text-amber-400 transition-colors mb-4">🫀</div><p className="text-sm text-gray-500 font-mono text-center">Drag & Drop DICOM / PNG</p><p className="text-[10px] text-gray-600 mt-2 tracking-wider">CT · IVUS · Echocardiogram · MRI</p><button className="mt-6 px-6 py-2 border border-amber-500/40 text-amber-400 text-[10px] tracking-[0.2em] uppercase rounded hover:bg-amber-500/10 transition-colors">Browse Files</button></>
                        )}
                    </div>
                    <div className="space-y-4 p-6 border border-gray-800/50 rounded-lg bg-black/30 backdrop-blur-sm">
                        {!result ? <EmptyState message="Run analysis to view imaging findings" /> : !imaging ? (
                            <div className="text-center py-8"><p className="text-xs text-gray-500 font-mono">No imaging report text was provided. For AI image analysis, imaging reports or DICOM data must be submitted directly via the clinical pipeline.</p></div>
                        ) : (
                            <>
                                <h3 className="text-xs text-gray-400 tracking-[0.2em] uppercase font-bold mb-2">AI Imaging Findings</h3>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">{imaging.findings_narrative || JSON.stringify(imaging, null, 2).slice(0, 400)}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Section 4: ECG ────────────────────────────────────────────────────── */
function ECGSection({ result }: { result: AnalysisResult | null }) {
    const leads = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-6xl w-full">
                <SectionHeader num="03" title="ECG" accent="Intelligence" color="emerald" subtitle="12-Lead waveform analysis · Rhythm classification · AI annotation" />
                {!result ? <EmptyState message="Run analysis pipeline to view ECG intelligence" /> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 p-4 border border-gray-800/50 rounded-lg bg-black/30">
                            <div className="grid grid-cols-4 gap-2">
                                {leads.map((lead, i) => (
                                    <div key={i} className="border border-gray-800/30 rounded p-2 bg-black/50">
                                        <span className="text-[9px] text-emerald-400 font-mono font-bold">{lead}</span>
                                        <svg viewBox="0 0 120 30" className="w-full h-8 mt-1">
                                            <polyline fill="none" stroke="#34d399" strokeWidth="1" points={`0,15 ${10+i},15 ${15+i},15 ${18+i},${5+i%3} ${20+i},${25-i%4} ${22+i},${10+i%2} ${25+i},15 ${35+i},15 ${40+i},15 ${45+i},15 ${48+i},${3+i%5} ${50+i},${27-i%3} ${52+i},${8+i%2} ${55+i},15 65,15 70,15 75,15 78,${5+i%4} 80,${25-i%5} 82,${10+i%3} 85,15 95,15 100,15 105,15 108,${5+i%3} 110,${25-i%4} 112,${10+i%2} 115,15 120,15`} />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 border border-gray-800/50 rounded-lg bg-black/30">
                                <h4 className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-3 font-bold">ECG Assessment</h4>
                                <p className="text-xs text-gray-400 font-mono leading-relaxed">Simulated 12-lead ECG visualization. Full automated ECG interpretation requires dedicated ECG signal input. Cardiac risk factors from biomarker analysis have been incorporated into the composite risk score.</p>
                            </div>
                            {result.risk_assessment?.urgent_flags?.length > 0 && (
                                <div className="p-4 border border-red-800/50 rounded-lg bg-black/30">
                                    <h4 className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-2 font-bold">AI Alert Flags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {result.risk_assessment.urgent_flags.map((flag: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded text-[9px] text-red-400 font-bold">{flag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─── Section 5: Risk Dashboard ─────────────────────────────────────────── */
function RiskDashboardSection({ result }: { result: AnalysisResult | null }) {
    const scores = result?.clinical_scores || {};
    const risk = result?.risk_assessment || {};
    const composite = risk.composite_ml_risk_score ?? 0;
    const ciLo = risk.confidence_interval_lower ?? 0;
    const ciHi = risk.confidence_interval_upper ?? 0;
    const tier = (risk.overall_risk_tier || "unknown").toUpperCase().replace(/_/g, " ");
    const tierColor = tier.includes("VERY HIGH") || tier.includes("HIGH") ? "text-red-400" : tier.includes("INTERMEDIATE") ? "text-amber-400" : tier === "UNKNOWN" ? "text-gray-500" : "text-emerald-400";

    // Map from backend keys (with _risk suffix) to display
    const scoreCards = [
        { name: "Framingham", value: scores.framingham_10yr_risk != null ? `${scores.framingham_10yr_risk}%` : "—", desc: "10-Year CVD Risk" },
        { name: "Pooled Cohort", value: scores.pooled_cohort_10yr_risk != null ? `${scores.pooled_cohort_10yr_risk}%` : "—", desc: "10-Year ASCVD" },
        { name: "GRACE", value: scores.grace_score ?? "—", desc: "ACS Risk Score" },
        { name: "TIMI", value: scores.timi_score ?? "—", desc: "UA/NSTEMI Score" },
        { name: "Reynolds", value: scores.reynolds_risk != null ? `${scores.reynolds_risk}%` : "—", desc: "CVD + hs-CRP" },
        { name: "SCORE2", value: scores.score2_risk != null ? `${scores.score2_risk}%` : "—", desc: "ESC 10-Year CVD" },
    ];

    const cardColor = (val: string) => {
        if (val === "—" || val === "null") return "text-gray-500 border-gray-700/30";
        const num = parseFloat(val);
        if (isNaN(num)) return "text-amber-400 border-amber-500/30";
        if (num >= 20 || num >= 140) return "text-red-400 border-red-500/30";
        if (num >= 10 || num >= 100) return "text-amber-400 border-amber-500/30";
        return "text-emerald-400 border-emerald-500/30";
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-6xl w-full">
                <SectionHeader num="04" title="Risk Score" accent="Dashboard" color="red" subtitle="Multi-algorithm consensus · Composite AI synthesis · Confidence intervals" />
                {!result ? <EmptyState message="Run analysis pipeline to view risk scores" /> : (
                    <>
                        <div className="flex items-center justify-center mb-12">
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="6" />
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#riskGrad)" strokeWidth="6" strokeDasharray={`${composite * 2.64} ${264 - composite * 2.64}`} strokeLinecap="round" />
                                    <defs><linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{composite || "—"}</span>
                                    <span className="text-[9px] text-gray-500 tracking-[0.2em] uppercase">Composite Risk</span>
                                </div>
                            </div>
                            <div className="ml-8">
                                <div className="text-xs text-gray-500 font-mono mb-1">95% Confidence Interval</div>
                                <div className="text-2xl font-bold text-white">{ciLo || "—"} — {ciHi || "—"}</div>
                                <div className={`text-sm font-bold mt-2 tracking-wider ${tierColor}`}>→ {tier}</div>
                                {risk.ten_year_mace_probability != null && <div className="text-xs text-gray-400 font-mono mt-1">10-Year MACE: {risk.ten_year_mace_probability}%</div>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                            {scoreCards.map((s, i) => (
                                <div key={i} className={`p-4 border rounded-lg bg-black/40 text-center ${cardColor(String(s.value))}`}>
                                    <span className="text-[9px] text-gray-500 tracking-[0.15em] uppercase block mb-2 font-semibold">{s.name}</span>
                                    <span className="text-2xl font-bold block">{s.value}</span>
                                    <span className="text-[9px] text-gray-600 block mt-1">{s.desc}</span>
                                </div>
                            ))}
                        </div>
                        {/* Modifiable Risk Drivers */}
                        {risk.modifiable_risk_drivers?.length > 0 && (
                            <div className="mb-6 p-5 border border-amber-500/20 rounded-lg bg-black/40">
                                <h4 className="text-[10px] text-amber-400 tracking-[0.2em] uppercase mb-3 font-bold">Modifiable Risk Drivers</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {risk.modifiable_risk_drivers.map((d: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-3 border border-gray-800/30 rounded bg-black/30">
                                            <div><span className="text-xs text-white font-bold">{d.factor}</span><span className="text-[9px] text-gray-500 ml-2">Current: {d.current_value}</span></div>
                                            <div className="text-right"><span className="text-[9px] text-emerald-400">Target: {d.target_value}</span><span className="ml-2 text-[9px] text-amber-400 font-bold">Impact: {d.impact_score}/10</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {risk.clinical_reasoning && (
                            <div className="p-5 border border-cyan-500/20 rounded-lg bg-black/40">
                                <h4 className="text-[10px] text-cyan-400 tracking-[0.2em] uppercase mb-2 font-bold">AI Clinical Reasoning</h4>
                                <p className="text-xs text-gray-300 font-mono leading-relaxed">{risk.clinical_reasoning}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

/* ─── Section 6: Intervention Dashboard ───────────────────────────────────────────── */
function InterventionSection({ result }: { result: AnalysisResult | null }) {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Medications", "Lifestyle", "Exercise", "Diet", "Monitoring", "Referrals"];
    const tabColors = ["text-cyan-400 border-cyan-500", "text-emerald-400 border-emerald-500", "text-amber-400 border-amber-500", "text-pink-400 border-pink-500", "text-purple-400 border-purple-500", "text-red-400 border-red-500"];
    const tabBgs = ["bg-cyan-500/10", "bg-emerald-500/10", "bg-amber-500/10", "bg-pink-500/10", "bg-purple-500/10", "bg-red-500/10"];
    const plan = result?.intervention_plan || {};

    const renderItems = (tabIndex: number) => {
        if (!plan || Object.keys(plan).length === 0) return <EmptyState message="Run analysis pipeline to view intervention plan" />;

        if (tabIndex === 0) {
            // Medications
            const meds = plan.pharmacological_recommendations || [];
            if (!meds.length) return <p className="text-sm text-gray-500 font-mono p-4">No pharmacological interventions indicated.</p>;
            return (
                <div className="space-y-4">
                    {meds.map((m: any, i: number) => (
                        <div key={i} className="p-5 border border-cyan-500/20 rounded-lg bg-black/40 hover:bg-cyan-900/10 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">💊</div>
                                    <div>
                                        <h4 className="text-base font-bold text-white tracking-wide">{m.drug || "Unknown Medication"}</h4>
                                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{m.dose} · {m.frequency}</span>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-[9px] font-bold uppercase rounded border border-cyan-500/50">{m.evidence_grade}</span>
                            </div>
                            <div className="mt-3 pl-11">
                                <span className="block text-xs text-amber-400/80 mb-2">Monitor: {m.monitoring}</span>
                                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full" style={{ width: '100%' }}></div>
                                </div>
                                <span className="text-[8px] text-gray-500 italic mt-1 block tracking-wider text-right">{m.guideline_source}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (tabIndex === 1) {
            // Lifestyle
            const life = plan.lifestyle_modifications || [];
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {life.map((l: any, i: number) => (
                        <div key={i} className="p-4 border-l-4 border-emerald-500/50 bg-black/40 rounded-r-lg">
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">{l.evidence_grade}</span>
                            <h4 className="text-sm font-bold text-white mb-2">{l.recommendation}</h4>
                            <p className="text-xs text-gray-400 font-mono leading-relaxed">{l.description}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-[2px] w-full bg-gray-800"><div className="h-full bg-emerald-500" style={{ width: `${80 - (i * 10)}%` }} /></div>
                                <span className="text-[9px] text-gray-500 whitespace-nowrap">Impact Est.</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (tabIndex === 2) {
            // Exercise
            const ex = plan.exercise_prescription || {};
            return (
                <div className="p-6 border border-amber-500/20 rounded-lg bg-black/40">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm text-amber-500 font-bold uppercase tracking-widest">F.I.T.T Protocol</h4>
                        <div className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30 rounded-full">Target HR: {ex.target_hr_range || 'N/A'}</div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-3 bg-black/60 rounded border border-gray-800"><span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Frequency</span><span className="text-xs text-white font-mono">{ex.frequency}</span></div>
                        <div className="p-3 bg-black/60 rounded border border-gray-800"><span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Intensity</span><span className="text-xs text-white font-mono">{ex.intensity}</span></div>
                        <div className="p-3 bg-black/60 rounded border border-gray-800"><span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Time</span><span className="text-xs text-white font-mono">{ex.time}</span></div>
                        <div className="p-3 bg-black/60 rounded border border-gray-800"><span className="block text-[9px] text-gray-500 uppercase tracking-widest mb-1">Type</span><span className="text-xs text-white font-mono">{ex.type}</span></div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] text-gray-400"><strong className="text-amber-500">Progression:</strong> {ex.progression}</p>
                        <p className="text-[10px] text-gray-400"><strong className="text-red-500">Contraindications:</strong> {ex.contraindications}</p>
                    </div>
                </div>
            );
        }

        if (tabIndex === 3) {
            // Diet
            const diet = plan.dietary_plan || [];
            return (
                <div className="space-y-4">
                    {diet.map((d: any, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-black/40 border border-pink-500/20 rounded-lg">
                            <div className="w-12 h-12 shrink-0 rounded bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-lg">🥗</div>
                            <div>
                                <h4 className="text-sm font-bold text-white mb-1">{d.recommendation}</h4>
                                <p className="text-xs text-gray-400 font-mono leading-relaxed">{d.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (tabIndex === 4) {
            // Monitoring
            const mon = plan.monitoring_schedule || [];
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-purple-500/30">
                                <th className="p-3 text-[10px] text-purple-400 uppercase tracking-widest font-bold">Biomarker / Test</th>
                                <th className="p-3 text-[10px] text-purple-400 uppercase tracking-widest font-bold">Frequency</th>
                                <th className="p-3 text-[10px] text-purple-400 uppercase tracking-widest font-bold">Clinical Target</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mon.map((m: any, i: number) => (
                                <tr key={i} className="border-b border-gray-800 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 text-xs font-bold text-white">{m.test}</td>
                                    <td className="p-4 text-xs font-mono text-gray-400">{m.frequency}</td>
                                    <td className="p-4 text-xs font-mono text-emerald-400">{m.target}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (tabIndex === 5) {
            // Referrals
            const ref = plan.procedural_referrals || [];
            if (!ref.length) return <p className="text-sm text-gray-500 font-mono p-4">No urgent procedural referrals indicated based on current risk profile.</p>;
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ref.map((r: any, i: number) => (
                        <div key={i} className="p-5 border border-red-500/20 rounded-lg bg-black/40 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl rounded-full" />
                            <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 text-[9px] font-bold uppercase rounded border border-red-500/50 mb-3">{r.urgency}</span>
                            <h4 className="text-sm font-bold text-white mb-2">{r.procedure}</h4>
                            <p className="text-xs text-gray-400 font-mono">{r.indication}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl w-full">
                <SectionHeader num="05" title="Intervention" accent="Synthesis" color="emerald" subtitle="Evidence-based recommendations · Guideline citations · FITT prescription" />
                {!result ? <EmptyState message="Run analysis pipeline to view intervention pathways" /> : (
                    <>
                        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                            {tabs.map((tab, i) => (
                                <button key={i} onClick={() => setActiveTab(i)}
                                    className={`px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold rounded-md border transition-all whitespace-nowrap ${activeTab === i ? `${tabBgs[i]} ${tabColors[i]}` : "text-gray-500 border-gray-800 hover:border-gray-600 bg-black/30"}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="min-h-[300px]">
                            {renderItems(activeTab)}
                        </div>
                        {plan.guideline_citations?.length > 0 && (
                            <div className="mt-8 p-5 border border-gray-800/50 rounded-lg bg-black/30">
                                <h4 className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-4 font-bold flex items-center gap-2">
                                    <div className="w-1 h-3 bg-cyan-500 rounded-sm" /> Clinical Guidelines Database
                                </h4>
                                <div className="space-y-3">
                                    {plan.guideline_citations.map((c: any, i: number) => (
                                        <div key={i} className="p-3 bg-black/40 border border-gray-800/50 rounded flex gap-4 items-start">
                                            <div className="w-10 h-10 rounded shrink-0 bg-cyan-900/30 border border-cyan-800/50 flex flex-col justify-center items-center">
                                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">Level</span>
                                                <span className="text-xs text-white font-bold">{c.evidence_level?.replace('Level ', '') || 'A'}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-cyan-400 font-bold block mb-1">{c.guideline}</span>
                                                <span className="text-xs text-gray-400 font-mono leading-relaxed block">{c.recommendation}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

/* ─── Section 7: Report ─────────────────────────────────────────────────── */
function ReportSection({ result, formData }: { result: AnalysisResult | null; formData: any }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const report = result?.clinical_report || {};

    const handlePDFDownload = async () => {
        if (!formData) return;
        setIsGenerating(true);
        try {
            const res = await fetch(`${API_BASE}/analysis/generate-pdf`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error(`PDF generation failed: ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `CHD_Report_${formData.firstName}_${formData.lastName}_${new Date().toISOString().slice(0, 10)}.pdf`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err: any) { alert(`PDF generation error: ${err.message}`); } finally { setIsGenerating(false); }
    };

    const sections = [
        { key: "executive_summary", label: "Executive Summary", color: "text-cyan-400" },
        { key: "clinical_background", label: "Clinical Background", color: "text-gray-400" },
        { key: "biomarker_narrative", label: "Biomarker Analysis", color: "text-red-400" },
        { key: "risk_assessment_narrative", label: "Risk Assessment", color: "text-amber-400" },
        { key: "intervention_narrative", label: "Interventions & Treatment", color: "text-emerald-400" },
        { key: "recommendations", label: "Prioritized Recommendations", color: "text-purple-400" },
        { key: "monitoring_narrative", label: "Follow-Up Plan", color: "text-cyan-400" },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl w-full">
                <SectionHeader num="06" title="Clinical" accent="Report" color="purple" subtitle="AI-generated narrative · PDF export · Physician review" />
                {!result ? <EmptyState message="Run analysis pipeline to generate clinical report" /> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 border border-gray-800/50 rounded-lg bg-black/30 p-6 max-h-[600px] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs text-gray-400 tracking-[0.2em] uppercase font-bold">Report Preview</h3>
                                <span className="text-[9px] text-emerald-400 font-bold tracking-wider">AI GENERATED</span>
                            </div>
                            <div className="space-y-5">
                                {sections.map(s => {
                                    const content = report[s.key];
                                    if (!content) return null;
                                    return (
                                        <div key={s.key}>
                                            <h4 className={`text-[10px] ${s.color} tracking-[0.2em] uppercase mb-2 font-bold`}>{s.label}</h4>
                                            <p className="text-xs text-gray-300 font-mono leading-relaxed">{content}</p>
                                        </div>
                                    );
                                })}
                                <div className="p-3 border border-gray-700/30 rounded bg-black/50">
                                    <p className="text-[9px] text-gray-500 italic font-mono leading-relaxed">{report.disclaimer || "This AI-assisted analysis requires physician review and clinical correlation before any treatment decisions are made."}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-5 border border-gray-800/50 rounded-lg bg-black/30">
                                <h4 className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-3 font-bold">Physician Notes</h4>
                                <textarea className="w-full h-24 bg-black/60 border border-gray-700/60 rounded px-3 py-2 text-xs text-white font-mono placeholder-gray-600 focus:border-purple-500/50 focus:outline-none resize-none" placeholder="Add clinical notes..." />
                            </div>
                            <button onClick={handlePDFDownload} disabled={isGenerating}
                                className={`w-full py-3 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded transition-all ${isGenerating ? "bg-gray-700 cursor-wait" : "bg-gradient-to-r from-purple-600/80 to-purple-500/60 hover:from-purple-500 cursor-pointer"}`}>
                                {isGenerating ? "Generating PDF…" : "Download PDF Report"}
                            </button>
                            {result.errors?.length > 0 && (
                                <div className="p-3 border border-red-800/50 rounded bg-black/30">
                                    <h4 className="text-[10px] text-red-400 tracking-widest uppercase mb-1 font-bold">Pipeline Warnings</h4>
                                    {result.errors.map((e: string, i: number) => <p key={i} className="text-[9px] text-red-400/80 font-mono">{e}</p>)}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─── Section 8: Monitoring ─────────────────────────────────────────────── */
function MonitoringSection({ result }: { result: AnalysisResult | null }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24">
            <div className="max-w-5xl w-full">
                <SectionHeader num="07" title="Longitudinal" accent="Monitoring" color="cyan" subtitle="Patient timeline · Biomarker trends · Risk trajectory" />
                {!result ? <EmptyState message="Run analysis pipeline to begin longitudinal tracking" /> : (
                    <div className="relative pl-8 border-l border-gray-800 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[2.55rem] w-4 h-4 rounded-full border-2 border-cyan-500 bg-cyan-500/20" />
                            <div className="p-4 border border-gray-800/50 rounded-lg bg-black/30">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-gray-500 font-mono tracking-wider">{new Date().toISOString().slice(0, 10)}</span>
                                    <span className={`text-sm font-bold ${(result.risk_assessment?.composite_ml_risk_score || 0) >= 60 ? "text-red-400" : (result.risk_assessment?.composite_ml_risk_score || 0) >= 30 ? "text-amber-400" : "text-emerald-400"}`}>
                                        {result.risk_assessment?.composite_ml_risk_score || "—"}/100
                                    </span>
                                </div>
                                <span className="text-sm text-white font-semibold">Initial Assessment — Baseline</span>
                                <p className="text-[10px] text-gray-500 mt-2 font-mono">Tier: {(result.risk_assessment?.overall_risk_tier || "N/A").toUpperCase()}. Future assessments will track risk trajectory.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─── Root Export ────────────────────────────────────────────────────────── */
export default function CHDScrollSections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [lastFormData, setLastFormData] = useState<any>(null);

    const handleAnalyze = useCallback(async (formData: any) => {
        setIsAnalyzing(true);
        setLastFormData(formData);
        setAnalysisResult(null);
        try {
            const res = await fetch(`${API_BASE}/analysis/analyze`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
            });
            if (!res.ok) { const err = await res.json().catch(() => ({ detail: res.statusText })); throw new Error(err.detail || "Analysis failed"); }
            const data: AnalysisResult = await res.json();
            setAnalysisResult(data);
        } catch (err: any) { alert(`Analysis error: ${err.message}`); } finally { setIsAnalyzing(false); }
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const sections = containerRef.current.querySelectorAll("section");
        sections.forEach((section) => {
            gsap.fromTo(section, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", end: "top 50%", toggleActions: "play none none reverse" } });
        });
    }, []);

    return (
        <div ref={containerRef} className="relative z-30 bg-black">
            <PatientIntakeSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <BiomarkerSection result={analysisResult} formData={lastFormData} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <ECGSection result={analysisResult} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <RiskDashboardSection result={analysisResult} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <InterventionSection result={analysisResult} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <ReportSection result={analysisResult} formData={lastFormData} />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <MonitoringSection result={analysisResult} />
            <footer className="py-16 px-6 md:px-20 text-center border-t border-gray-800/50">
                <p className="text-[10px] text-gray-600 font-mono leading-relaxed max-w-3xl mx-auto tracking-wide">This AI-assisted analysis is intended to support clinical decision-making and does not constitute a medical diagnosis. All risk assessments, recommendations, and reports require review, clinical correlation, and approval by a licensed physician.</p>
                <p className="text-[9px] text-gray-700 mt-4 font-mono tracking-widest uppercase">CHD Predictor AI · Agentic Infrastructure v2.0</p>
            </footer>
        </div>
    );
}
