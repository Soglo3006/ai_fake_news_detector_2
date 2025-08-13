import { useState, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

function HomePage({ content, setContent }) {
  const [messages, setMessages] = useState([]);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [showFeedback, SetshowFeedback] = useState(false);
  const [expectedLabel, setExpectedLabel] = useState("FAKE");
  const inputRef = useRef(null);
  const [feedbackComment, setFeedbackComment] = useState("");

  const analyzeText = async () => {
    if (content.trim().length < 1) {
      alert("Veuillez entrer un article de nouvelles");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: content, result: data }]);
      setContent("");
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error);
    }
  };

  const sendFeedback = async () => {
    if (feedbackContent.trim().length < 1) {
      alert("Veuillez entrer un commentaire.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: feedbackContent,
          expected_label: expectedLabel,
          comment: feedbackComment,
        }),
      });
      const data = await response.json();
      alert(data.message);
      setFeedbackContent("");
      setFeedbackComment("");
      SetshowFeedback(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi du feedback :", error);
      alert("Échec de l'envoi du feedback.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
      SetshowFeedback={SetshowFeedback}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white shadow-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <h1 className="text-2xl font-bold text-gray-800">Fake News Detector</h1>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 flex flex-col items-center py-8 px-4 gap-6">
          <div className="w-full max-w-3xl space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <div className="text-right mb-2">
                  <div className="inline-block bg-blue-100 text-gray-800 px-4 py-2 rounded-lg">
                    {msg.text}
                  </div>
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    msg.result.label === "FAKE"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {msg.result.label} – {Math.round(msg.result.confidence * 100)}%
                </h3>
                <p className="text-gray-600">
                  Ce texte présente des éléments typiques de{" "}
                  {msg.result.label === "FAKE"
                    ? "désinformation"
                    : "contenu fiable"}.
                </p>
              </div>
            ))}
            <div className="bg-white backdrop-blur-md bg-opacity-70 rounded-lg shadow-lg w-full p-6 flex flex-col gap-4">
              <div className="text-lg font-bold text-center">Analysez votre contenu</div>
              <textarea
                placeholder="Entrez votre article ici..."
                className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={content}
                ref={inputRef}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={analyzeText}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Analyser
              </button>
            </div>
          </div>
        </main>
        {showFeedback && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Envoyer un feedback</h3>
                <button
                  onClick={() => SetshowFeedback(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  placeholder="Entrez le texte analysé..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <select
                  value={expectedLabel}
                  onChange={(e) => setExpectedLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="FAKE">Fausse Information</option>
                  <option value="REAL">Vraie Information</option>
                </select>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Ajoutez un commentaire..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => SetshowFeedback(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={sendFeedback}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default HomePage;
