"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore'

// ინტერფეისი მონაცემთა სტრუქტურისთვის
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

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({})

  const categories = ['News', 'Programs', 'Education', 'Media', 'Events']

  // 1. მონაცემების წამოღება Firebase-დან
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreate = () => {
    setIsCreating(true)
    setEditForm({
      titleEn: '', titleGe: '',
      excerptEn: '', excerptGe: '',
      contentEn: '', contentGe: '',
      category: 'News', image: '',
      published: false
    })
  }

  const handleEdit = (post: BlogPost) => {
    setIsEditing(post.id)
    setEditForm(post)
  }

  // 2. შენახვისა და განახლების ლოგიკა
  const handleSave = async () => {
    const postData = {
      slug: editForm.titleEn?.toLowerCase().replace(/\s+/g, '-') || 'post',
      image: editForm.image || '',
      titleEn: editForm.titleEn || '',
      titleGe: editForm.titleGe || '',
      excerptEn: editForm.excerptEn || '',
      excerptGe: editForm.excerptGe || '',
      contentEn: editForm.contentEn || '',
      contentGe: editForm.contentGe || '',
      category: editForm.category || 'News',
      date: editForm.date || new Date().toISOString().split('T')[0],
      published: editForm.published || false
    };

    try {
      if (isCreating) {
        const docRef = await addDoc(collection(db, "posts"), postData);
        setPosts([{ id: docRef.id, ...postData } as BlogPost, ...posts]);
        alert("სტატია წარმატებით გამოქვეყნდა!");
      } else if (isEditing) {
        const postRef = doc(db, "posts", isEditing);
        await updateDoc(postRef, postData);
        setPosts(posts.map(p => p.id === isEditing ? { id: isEditing, ...postData } as BlogPost : p));
        alert("ცვლილებები შენახულია!");
      }
      handleCancel();
    } catch (error) {
      alert("შეცდომა შენახვისას: " + error);
    }
  }

  // 3. წაშლის ლოგიკა
  const handleDelete = async (id: string) => {
    if (confirm('ნამდვილად გსურთ ამ სტატიის წაშლა?')) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        alert("შეცდომა წაშლისას!");
      }
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setIsEditing(null)
    setEditForm({})
  }

  if (loading) return <div className="p-10 text-center">იტვირთება მონაცემები...</div>

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-[#002147] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">GEN ადმინ პანელი</h1>
            <p className="opacity-80">მართეთ საიტის კონტენტი და სიახლეები</p>
          </div>
          <button onClick={handleCreate} className="bg-[#d4af37] hover:bg-[#b8962e] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
            <Plus className="w-5 h-5" /> ახალი პოსტი
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Form Section */}
        {(isCreating || isEditing) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-[#d4af37]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#002147]">{isCreating ? 'ახალი სტატიის დამატება' : 'რედაქტირება'}</h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-red-500"><X /></button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* English Content */}
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-800 border-b pb-2">English Version</h3>
                <input className="w-full p-3 border rounded-lg" placeholder="Title (EN)" value={editForm.titleEn} onChange={e => setEditForm({...editForm, titleEn: e.target.value})} />
                <textarea className="w-full p-3 border rounded-lg h-24" placeholder="Short Excerpt (EN)" value={editForm.excerptEn} onChange={e => setEditForm({...editForm, excerptEn: e.target.value})} />
                <textarea className="w-full p-3 border rounded-lg h-40" placeholder="Full Content (EN)" value={editForm.contentEn} onChange={e => setEditForm({...editForm, contentEn: e.target.value})} />
              </div>

              {/* Georgian Content */}
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-800 border-b pb-2">ქართული ვერსია</h3>
                <input className="w-full p-3 border rounded-lg" placeholder="სათაური (GE)" value={editForm.titleGe} onChange={e => setEditForm({...editForm, titleGe: e.target.value})} />
                <textarea className="w-full p-3 border rounded-lg h-24" placeholder="მოკლე აღწერა (GE)" value={editForm.excerptGe} onChange={e => setEditForm({...editForm, excerptGe: e.target.value})} />
                <textarea className="w-full p-3 border rounded-lg h-40" placeholder="სრული ტექსტი (GE)" value={editForm.contentGe} onChange={e => setEditForm({...editForm, contentGe: e.target.value})} />
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4 items-end">
               <div>
                  <label className="text-sm block mb-1">სურათის ლინკი (URL)</label>
                  <input className="w-full p-3 border rounded-lg" placeholder="https://..." value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
               </div>
               <div>
                  <label className="text-sm block mb-1">კატეგორია</label>
                  <select className="w-full p-3 border rounded-lg" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
               <div className="flex justify-end gap-3">
                  <button onClick={handleCancel} className="px-6 py-3 border rounded-lg hover:bg-gray-100">გაუქმება</button>
                  <button onClick={handleSave} className="px-6 py-3 bg-[#002147] text-white rounded-lg flex items-center gap-2 hover:bg-blue-900">
                    <Save className="w-4 h-4" /> შენახვა
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* List Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gray-100 p-4 font-bold text-[#002147]">არსებული პოსტები ({posts.length})</div>
          <div className="divide-y">
            {posts.map(post => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {post.image && <img src={post.image} className="w-16 h-12 object-cover rounded" alt="" />}
                  <div>
                    <h3 className="font-semibold">{post.titleGe || post.titleEn}</h3>
                    <p className="text-sm text-gray-500">{post.date} • {post.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5"/></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
