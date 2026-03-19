"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BlogPost {
  id: string
  slug: string
  image: string
  titleEn: string
  titleGe: string
  excerptEn: string
  excerptGe: string
  contentEn: string
  contentGe: string
  category: string
  date: string
  published: boolean
}

// Sample data - in production this would come from a database
const initialPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'oxford-summer-program-2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/att.k8QthJ1OeUQTlrDmE8kfWRlwZV5te9UG3lXm_-Kmb04-khrV8QqfBqeAISkad8xSugNYL2KKlI.jpeg',
    titleEn: 'Oxford Summer Program 2026: Applications Now Open',
    titleGe: 'ოქსფორდის ზაფხულის პროგრამა 2026: რეგისტრაცია დაიწყო',
    excerptEn: 'Join us for an unforgettable summer experience.',
    excerptGe: 'შემოუერთდით ჩვენს დაუვიწყარ ზაფხულის გამოცდილებას.',
    contentEn: 'Full article content here...',
    contentGe: 'სრული სტატიის ტექსტი აქ...',
    category: 'Programs',
    date: '2026-03-15',
    published: true
  }
]

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({})

  const categories = ['News', 'Programs', 'Education', 'Media', 'Events']

  const handleCreate = () => {
    setIsCreating(true)
    setEditForm({
      titleEn: '',
      titleGe: '',
      excerptEn: '',
      excerptGe: '',
      contentEn: '',
      contentGe: '',
      category: 'News',
      image: '',
      published: false
    })
  }

  const handleEdit = (post: BlogPost) => {
    setIsEditing(post.id)
    setEditForm(post)
  }

  const handleSave = () => {
    if (isCreating) {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        slug: editForm.titleEn?.toLowerCase().replace(/\s+/g, '-') || '',
        image: editForm.image || '',
        titleEn: editForm.titleEn || '',
        titleGe: editForm.titleGe || '',
        excerptEn: editForm.excerptEn || '',
        excerptGe: editForm.excerptGe || '',
        contentEn: editForm.contentEn || '',
        contentGe: editForm.contentGe || '',
        category: editForm.category || 'News',
        date: new Date().toISOString().split('T')[0],
        published: editForm.published || false
      }
      setPosts([newPost, ...posts])
      setIsCreating(false)
    } else if (isEditing) {
      setPosts(posts.map(p => p.id === isEditing ? { ...p, ...editForm } as BlogPost : p))
      setIsEditing(null)
    }
    setEditForm({})
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setIsEditing(null)
    setEditForm({})
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-primary-foreground/80">Manage blog posts and content</p>
            </div>
            <Button 
              onClick={handleCreate}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {isCreating ? 'Create New Post' : 'Edit Post'}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (English)</label>
                  <Input
                    value={editForm.titleEn || ''}
                    onChange={e => setEditForm({ ...editForm, titleEn: e.target.value })}
                    placeholder="Enter title in English"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt (English)</label>
                  <textarea
                    value={editForm.excerptEn || ''}
                    onChange={e => setEditForm({ ...editForm, excerptEn: e.target.value })}
                    placeholder="Brief description in English"
                    className="w-full px-3 py-2 border rounded-lg resize-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content (English)</label>
                  <textarea
                    value={editForm.contentEn || ''}
                    onChange={e => setEditForm({ ...editForm, contentEn: e.target.value })}
                    placeholder="Full article content in English"
                    className="w-full px-3 py-2 border rounded-lg resize-none h-40"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (Georgian)</label>
                  <Input
                    value={editForm.titleGe || ''}
                    onChange={e => setEditForm({ ...editForm, titleGe: e.target.value })}
                    placeholder="შეიყვანეთ სათაური ქართულად"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt (Georgian)</label>
                  <textarea
                    value={editForm.excerptGe || ''}
                    onChange={e => setEditForm({ ...editForm, excerptGe: e.target.value })}
                    placeholder="მოკლე აღწერა ქართულად"
                    className="w-full px-3 py-2 border rounded-lg resize-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content (Georgian)</label>
                  <textarea
                    value={editForm.contentGe || ''}
                    onChange={e => setEditForm({ ...editForm, contentGe: e.target.value })}
                    placeholder="სრული სტატიის ტექსტი ქართულად"
                    className="w-full px-3 py-2 border rounded-lg resize-none h-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input
                  value={editForm.image || ''}
                  onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={editForm.category || 'News'}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.published || false}
                      onChange={e => setEditForm({ ...editForm, published: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm font-medium">Published</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Post
              </Button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">All Posts ({posts.length})</h2>
          </div>
          <div className="divide-y divide-border">
            {posts.map(post => (
              <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.titleEn}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{post.titleEn}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Note: This is a demo admin panel. In production, integrate with a database like Supabase for persistent storage.
        </p>
      </div>
    </div>
  )
}
