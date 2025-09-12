import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageSquare,
  Mail,
  Phone,
  Send,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  Clock,
  User,
  Search,
  Filter,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { messageService, type Message } from '../services/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function MessagesManagement() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    setResponseText('');
  }, [selectedMessage]);

  // Mark message as read when opened (backend uses in_progress instead of read)
  useEffect(() => {
    if (selectedMessage) {
      const m = messages.find(x => x._id === selectedMessage);
      if (m && m.status === 'new') {
        updateStatus(selectedMessage, 'in_progress');
      }
    }
  }, [selectedMessage, messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await messageService.getAll({ limit: 50 });
      if (res.success && res.data) {
        const anyData: any = res.data;
        const msgs: Message[] = (anyData.messages || anyData.items || []);
        setMessages(msgs);
        console.log('Loaded messages:', msgs.length);
      } else {
        setError(res.error || 'Failed to load messages');
      }
    } catch (e) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Message['status']) => {
    const res = await messageService.update(id, { status });
    if (res.success) {
      await loadMessages();
    } else {
      console.error('Update status failed:', res.error);
    }
  };

  const sendResponse = async (id: string, text: string) => {
    if (!text.trim()) return;
    const res = await messageService.update(id, { admin_response: text, status: 'replied' });
    if (res.success) {
      setResponseText('');
      await loadMessages();
    } else {
      console.error('Send response failed:', res.error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to delete message');
      }
      await loadMessages();
      setSelectedMessage(null);
    } catch (e) {
      console.error('Delete message error:', e);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-accent text-accent-foreground';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const displayStatus = (status: string) => (status === 'in_progress' ? 'read' : status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredMessages = messages.filter(message => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = (message.sender_name?.toLowerCase().includes(s) ||
                           message.subject?.toLowerCase().includes(s) ||
                           message.message?.toLowerCase().includes(s));
    return matchesSearch;
  });

  const selectedMessageData = selectedMessage ? messages.find(m => m._id === selectedMessage) : null;

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.new}</p>
                <p className="text-sm text-muted-foreground">New Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
                
              </div>

      {/* Messages Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Messages</CardTitle>
                {/* New message disabled */}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  {filteredMessages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedMessage === message._id ? 'bg-accent/10 border border-accent/20' : ''
                      }`}
                      onClick={() => setSelectedMessage(message._id)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-xs text-accent-foreground font-medium">
                              {message.sender_name?.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.sender_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1"></div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {message.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(message.status)}>
                          {displayStatus(message.status)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {message.created_at ? new Date(message.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">
                  {selectedMessageData ? 'Message Details' : 'Select a Message'}
                </CardTitle>
                {selectedMessageData && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => selectedMessage && deleteMessage(selectedMessage)}>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedMessageData ? (
                <div className="space-y-6">
                  {/* Message Header */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-accent-foreground font-medium">
                          {selectedMessageData.sender_name?.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{selectedMessageData.sender_name}</h3>
                                                    <Badge className={getStatusColor(selectedMessageData.status)}>
                            {displayStatus(selectedMessageData.status)}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {selectedMessageData.sender_email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {selectedMessageData.sender_phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {selectedMessageData.created_at ? new Date(selectedMessageData.created_at).toLocaleString() : ''}
                          </div>
                          {selectedMessageData.related_booking && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Booking: {selectedMessageData.related_booking}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Subject: {selectedMessageData.subject}</h4>
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">{selectedMessageData.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* Previous Response */}
                  {selectedMessageData.admin_response && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Our Response
                      </h4>
                      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                        <p className="text-sm leading-relaxed">{selectedMessageData.admin_response}</p>
                      </div>
                    </div>
                  )}

                                  </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-primary mb-2">No Message Selected</h3>
                    <p className="text-muted-foreground">
                      Select a message from the list to view details and respond
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}