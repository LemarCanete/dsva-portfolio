'use client'
import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Settings } from "lucide-react"
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function LeadGenerationPage() {
  const [fields, setFields] = useState(["Name", "Email", "Phone"])
  const [leads, setLeads] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentLead, setCurrentLead] = useState(null)
  const [newLead, setNewLead] = useState({})

  useEffect(() => {
		createChat({
      webhookUrl: 'https://n8n-n8n.q32w7w.easypanel.host/webhook/53732122-9ab8-4cec-9c8d-d2e193254bd8/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'fullscreen',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'My name is Nathan. How can I assist you today?'
      ],
      i18n: {
        en: {
          title: '',
          subtitle: "",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
      enableStreaming: false,
    });
	}, []);

  // Handle Add Lead
  const handleAddLead = () => {
    setLeads([...leads, newLead])
    setNewLead({})
    setIsAddOpen(false)
  }

  // Handle Edit Lead
  const handleEditLead = () => {
    setLeads(
      leads.map((lead, idx) => (idx === currentLead.index ? newLead : lead))
    )
    setCurrentLead(null)
    setNewLead({})
    setIsEditOpen(false)
  }

  // Handle Delete Lead
  const handleDeleteLead = (index) => {
    setLeads(leads.filter((_, idx) => idx !== index))
  }

  // Handle Field Update
  const updateField = (index, newName) => {
    const updatedFields = [...fields]
    updatedFields[index] = newName
    setFields(updatedFields)
  }

  return (
    <div className="p-8 space-y-6 w-300 mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lead Generation</h1>
        <div className="space-x-2">
          <Button className="cursor-pointer" onClick={() => setIsAddOpen(true)}>Add Lead</Button>
          <Button className="cursor-pointer" variant="secondary" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4" />
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {fields.map((field, idx) => (
              <TableHead key={idx}>{field}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead, idx) => (
            <TableRow key={idx}>
              {fields.map((field) => (
                <TableCell key={field}>{lead[field] || ""}</TableCell>
              ))}
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentLead({ index: idx, ...lead })
                    setNewLead(lead)
                    setIsEditOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteLead(idx)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Add Lead Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <Input
                key={idx}
                placeholder={field}
                value={newLead[field] || ""}
                onChange={(e) =>
                  setNewLead({ ...newLead, [field]: e.target.value })
                }
              />
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleAddLead}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lead Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <Input
                key={idx}
                placeholder={field}
                value={newLead[field] || ""}
                onChange={(e) =>
                  setNewLead({ ...newLead, [field]: e.target.value })
                }
              />
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleEditLead}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Fields</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2"
              >
                <Input
                  value={field}
                  onChange={(e) => updateField(idx, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setFields(fields.filter((_, i) => i !== idx))
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input
                placeholder="New Field Name"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    setFields([...fields, e.currentTarget.value])
                    e.currentTarget.value = ""
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector(
                    "#new-field-input"
                  )
                  if (input && input.value) {
                    setFields([...fields, input.value])
                    input.value = ""
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat */}
      <div id="n8n-chat" className="border rounded-lg h-200"></div>
    </div>
  )
}
