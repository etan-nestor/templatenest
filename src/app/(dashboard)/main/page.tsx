// app/templates/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import TemplateCard from '@/components/TemplateCard'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { fetchTemplates, type Template, type FilterCondition } from '@/services/templateService'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    framework: null as string | null,
    category: null as string | null,
    isPremium: null as boolean | null
  })
  
  const templatesPerPage = 9

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Convertir nos filtres en conditions Firestore
        const firestoreFilters: FilterCondition[] = [];
        
        if (filters.framework) {
          firestoreFilters.push({ field: 'framework', operator: '==', value: filters.framework });
        }
        
        if (filters.category) {
          firestoreFilters.push({ field: 'category', operator: '==', value: filters.category });
        }
        
        if (filters.isPremium !== null) {
          firestoreFilters.push({ field: 'isPremium', operator: '==', value: filters.isPremium });
        }
        
        const data = await fetchTemplates(firestoreFilters);
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters.framework, filters.category, filters.isPremium]);

  const applySearchFilter = useCallback(() => {
    if (!searchQuery) {
      setFilteredTemplates(templates);
      return;
    }

    const filtered = templates.filter(template => {
      const searchLower = searchQuery.toLowerCase();
      return (
        template.title.toLowerCase().includes(searchLower) ||
        template.framework.toLowerCase().includes(searchLower) ||
        template.category.toLowerCase().includes(searchLower)
      );
    });
    
    setFilteredTemplates(filtered);
    setCurrentPage(1);
  }, [searchQuery, templates]);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, templates, applySearchFilter]);

  // Pagination logic
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  const handleFilterChange = useCallback((newFilters: {
    framework: string | null;
    category: string | null;
    isPremium: boolean | null;
  }) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        onFilterChange={handleFilterChange} 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleSidebar} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar 
          onSearch={handleSearch} 
          isCollapsed={isCollapsed} 
        />
        
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="mx-auto max-w-7xl p-6">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredTemplates.length} Templates Available
                {filters.framework && ` • Framework: ${filters.framework}`}
                {filters.category && ` • Category: ${filters.category}`}
                {filters.isPremium !== null && ` • Type: ${filters.isPremium ? 'Premium' : 'Free'}`}
              </h1>
            </div>

            {/* Templates Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(templatesPerPage)].map((_, index) => (
                  <div key={index} className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"></div>
                ))}
              </div>
            ) : currentTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No templates found</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {currentTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </motion.div>
            )}

            {/* Pagination (identique à votre version précédente) */}
            {filteredTemplates.length > templatesPerPage && (
              <div className="mt-8 flex items-center justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-md px-3 py-1 ${page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}