import React, { useState } from 'react';
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

export function MessagesManagement() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const messages = [
    {
      id: 'MSG001',
      from: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 1 23 45 67 89',
      subject: 'Special request for champagne service',
      message: 'Bonjour, I would like to request champagne service for my upcoming booking on January 20th. This is for a special anniversary celebration. Could you please confirm this is available?',
      date: '2024-01-15 14:30',
      status: 'new',
      priority: 'high',
      category: 'booking',
      bookingId: 'BK001',
      isStarred: true,
      response: null
    },
    {
      id: 'MSG002',
      from: 'James Wilson',
      email: 'j.wilson@company.com',
      phone: '+44 20 7946 0958',
      subject: 'Question about tour duration',
      message: 'Hello, I am planning a city tour for my family. Could you tell me how long the typical Eiffel Tower to Louvre tour takes? We have a dinner reservation at 8 PM.',
      date: '2024-01-15 16:15',
      status: 'responded',
      priority: 'medium',
      category: 'inquiry',
      bookingId: null,
      isStarred: false,
      response: 'The tour typically takes 2-3 hours including travel time. We can ensure you arrive back by 7:30 PM for your dinner reservation.'
    },
    {
      id: 'MSG003',
      from: 'Sofia Martinez',
      email: 'sofia.m@gmail.com',
      phone: '+34 91 123 45 67',
      subject: 'Feedback on recent service',
      message: 'I wanted to thank you for the excellent service during our Versailles trip yesterday. The driver was very knowledgeable and professional. I will definitely recommend your service to friends.',
      date: '2024-01-14 10:45',
      status: 'archived',
      priority: 'low',
      category: 'feedback',
      bookingId: 'BK003',
      isStarred: true,
      response: 'Thank you so much for your kind words! We are delighted to hear you enjoyed your Versailles experience.'
    },
    {
      id: 'MSG004',
      from: 'Michael Chen',
      email: 'mchen@tech.com',
      phone: '+1 555 123 4567',
      subject: 'Corporate account setup inquiry',
      message: 'Good morning, our company is interested in setting up a corporate account for regular transportation needs in Paris. Could you provide information about corporate rates and billing options?',
      date: '2024-01-16 09:20',
      status: 'new',
      priority: 'high',
      category: 'business',
      bookingId: null,
      isStarred: false,
      response: null
    },
    {
      id: 'MSG005',
      from: 'Emma Thompson',
      email: 'emma.thompson@email.co.uk',
      phone: '+44 20 1234 5678',
      subject: 'Change of pickup location',
      message: 'Hi, I need to change the pickup location for my booking tomorrow from the hotel to the airport. Is this possible? My flight was rescheduled.',
      date: '2024-01-16 11:30',
      status: 'in-progress',
      priority: 'urgent',
      category: 'modification',
      bookingId: 'BK005',
      isStarred: false,
      response: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-accent text-accent-foreground';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedMessageData = selectedMessage ? messages.find(m => m.id === selectedMessage) : null;

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    inProgress: messages.filter(m => m.status === 'in-progress').length,
    urgent: messages.filter(m => m.priority === 'urgent').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.urgent}</p>
                <p className="text-sm text-muted-foreground">Urgent</p>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send New Message</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label>Recipient</Label>
                        <Input placeholder="customer@email.com" />
                      </div>
                      <div>
                        <Label>Subject</Label>
                        <Input placeholder="Message subject" />
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea placeholder="Type your message..." rows={4} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-accent hover:bg-accent/90">
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedMessage === message.id ? 'bg-accent/10 border border-accent/20' : ''
                      }`}
                      onClick={() => setSelectedMessage(message.id)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-xs text-accent-foreground font-medium">
                              {message.from.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.from}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {message.isStarred && (
                            <Star className="w-3 h-3 text-accent fill-current" />
                          )}
                          <Badge className={`${getPriorityColor(message.priority)} text-xs`}>
                            {message.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {message.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.date).toLocaleDateString()}
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
                    <Button variant="outline" size="sm">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
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
                          {selectedMessageData.from.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{selectedMessageData.from}</h3>
                          <Badge className={getPriorityColor(selectedMessageData.priority)}>
                            {selectedMessageData.priority}
                          </Badge>
                          <Badge className={getStatusColor(selectedMessageData.status)}>
                            {selectedMessageData.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {selectedMessageData.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {selectedMessageData.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(selectedMessageData.date).toLocaleString()}
                          </div>
                          {selectedMessageData.bookingId && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Booking: {selectedMessageData.bookingId}
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
                  {selectedMessageData.response && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Our Response
                      </h4>
                      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                        <p className="text-sm leading-relaxed">{selectedMessageData.response}</p>
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  <div className="space-y-4">
                    <h4 className="font-medium">
                      {selectedMessageData.response ? 'Follow-up Response' : 'Send Response'}
                    </h4>
                    <Textarea 
                      placeholder="Type your response..." 
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex gap-2">
                      <Button className="bg-accent hover:bg-accent/90">
                        <Send className="w-4 h-4 mr-2" />
                        Send Response
                      </Button>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Set status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                          <SelectItem value="archived">Archive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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