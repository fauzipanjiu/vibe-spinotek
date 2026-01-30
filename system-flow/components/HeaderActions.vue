<template>
  <div class="flex items-center gap-4">
    <!-- Templates Dropdown -->
    <div class="relative group/templates">
      <button class="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all text-blue-500 group-hover/templates:border-blue-500 shadow-sm shadow-blue-500/5">
        <LayoutTemplateIcon class="w-3.5 h-3.5" />
        <span class="text-[10px] font-black uppercase tracking-widest">Templates</span>
        <ChevronDownIcon class="w-3 h-3 opacity-50 group-hover/templates:rotate-180 transition-transform duration-300" />
      </button>

      <!-- Dropdown Menu -->
      <div class="absolute top-full right-0 w-56 opacity-0 translate-y-2 pointer-events-none group-hover/templates:opacity-100 group-hover/templates:translate-y-0 group-hover/templates:pointer-events-auto transition-all duration-300 z-[110] pt-2">
        <div class="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 backdrop-blur-3xl">
          <div class="px-3 py-2 text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 mb-1">
            Structural Presets
          </div>
          
          <button 
            v-for="t in templates" 
            :key="t.id"
            @click="$emit('apply-template', t.id)"
            class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 rounded-xl transition-colors group/item"
          >
            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/item:scale-110 transition-transform">
              <component :is="t.icon" class="w-4 h-4" />
            </div>
            <div class="flex flex-col items-start px-2">
              <span class="text-[10px] font-black text-slate-700 dark:text-white uppercase">{{ t.name }}</span>
              <span class="text-[8px] text-slate-400 dark:text-white/30">{{ t.desc }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="h-4 w-[1px] bg-slate-200 dark:bg-white/10"></div>

    <!-- Dark/Light Toggle -->
    <button 
      @click="toggleDarkMode" 
      class="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-white/60"
    >
      <component :is="state.isDarkMode ? SunIcon : MoonIcon" class="w-3.5 h-3.5" />
    </button>

    <!-- Export Dropdown -->
    <div class="relative group/export">
      <button class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg transition-all text-slate-600 dark:text-white/80">
        <DownloadIcon class="w-3 h-3" />
        <span class="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Export</span>
        <ChevronDownIcon class="w-2.5 h-2.5 opacity-50" />
      </button>
      
      <div class="absolute top-full right-0 w-44 opacity-0 translate-y-2 pointer-events-none group-hover/export:opacity-100 group-hover/export:translate-y-0 group-hover/export:pointer-events-auto transition-all duration-300 z-[110] pt-2">
        <div class="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden p-1 backdrop-blur-3xl">
          <button @click="exportData" class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-left">
             <FileJsonIcon class="w-3.5 h-3.5 text-blue-500" />
             <span class="text-[10px] font-bold text-slate-700 dark:text-white/80 uppercase">Data (JSON)</span>
          </button>
          <button @click="exportScreenshot" class="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-left">
             <ImageIcon class="w-3.5 h-3.5 text-purple-500" />
             <span class="text-[10px] font-bold text-slate-700 dark:text-white/80 uppercase">Image (PNG)</span>
          </button>
        </div>
      </div>
    </div>

    <label class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg cursor-pointer transition-all text-slate-600 dark:text-white/80">
      <UploadIcon class="w-3 h-3" />
      <span class="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Import</span>
      <input type="file" @change="handleImport" class="hidden" accept=".json" />
    </label>
    
    <!-- Reset Button -->
    <button 
      @click="$emit('reset-request')"
      class="w-8 h-8 rounded-lg border border-red-500/20 flex items-center justify-center hover:bg-red-500/10 text-red-500 transition-all active:scale-90"
      title="Reset Canvas"
    >
      <RefreshCcwIcon class="w-3.5 h-3.5" />
    </button>

    <button @click="shareFlow" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center gap-2">
      <Share2Icon class="w-3.5 h-3.5" />
      SHARE FLOW
    </button>
  </div>
</template>

<script setup>
import { 
  SunIcon, MoonIcon, DownloadIcon, UploadIcon, 
  LayoutTemplateIcon, RefreshCcwIcon, ChevronDownIcon,
  ShieldCheckIcon, ShoppingCartIcon, ServerIcon, DatabaseIcon,
  FileJsonIcon, ImageIcon, Share2Icon
} from 'lucide-vue-next';
import { onMounted, watch } from 'vue';
import { toPng } from 'html-to-image';

const props = defineProps(['state', 'exportData', 'importData']);
const emit = defineEmits(['reset-request', 'apply-template']);

const templates = [
  { id: 'auth', name: 'Auth Flow', desc: 'Login & Verification', icon: ShieldCheckIcon },
  { id: 'ecommerce', name: 'Commerce', desc: 'Product to Success', icon: ShoppingCartIcon },
  { id: 'saas', name: 'SaaS Layout', desc: 'Dashboard Hub', icon: ServerIcon },
  { id: 'erp', name: 'ERP Complex', desc: 'Management System', icon: DatabaseIcon },
];

const toggleDarkMode = () => {
    props.state.isDarkMode = !props.state.isDarkMode;
};

const updateHtmlClass = () => {
    if (props.state.isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

onMounted(() => {
    updateHtmlClass();
});

watch(() => props.state.isDarkMode, updateHtmlClass);

const handleImport = (e) => {
  if (e.target.files.length > 0) {
    props.importData(e.target.files[0]);
  }
};

const exportScreenshot = async () => {
  const node = document.getElementById('canvas-area');
  if (!node || props.state.blocks.length === 0) return;

  // 1. Enter Exporting Mode (hides UI items via Vue state)
  props.state.isExporting = true;
  
  // 2. Wait for Vue to update the DOM
  setTimeout(async () => {
    try {
      // 3. Find bounding box of all blocks
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      props.state.blocks.forEach(b => {
        minX = Math.min(minX, b.x);
        minY = Math.min(minY, b.y);
        maxX = Math.max(maxX, b.x + (b.width || 280));
        maxY = Math.max(maxY, b.y + (b.height || 200));
      });

      // Add padding
      const padding = 100;
      const width = (maxX - minX) + (padding * 2);
      const height = (maxY - minY) + (padding * 2);

      // 4. Capture with explicit size to avoid cropping
      const dataUrl = await toPng(node, {
        backgroundColor: props.state.isDarkMode ? '#050505' : '#f8fafc',
        width: width,
        height: height,
        style: {
           // Temporarily reset translate/scale for the capture node
           transform: `translate(${-minX + padding}px, ${-minY + padding}px) scale(1)`,
           width: `${width}px`,
           height: `${height}px`
        }
      });

      const link = document.createElement('a');
      link.download = `system-flow-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      emit('notify', { message: 'Flow exported as high-res PNG', type: 'success' });
    } catch (err) {
      console.error('Export failed:', err);
      emit('notify', { message: 'Export failed. Try again.', type: 'error' });
    } finally {
      props.state.isExporting = false;
    }
  }, 100);
};

const shareFlow = () => {
  const flowData = {
    blocks: props.state.blocks,
    connections: props.state.connections
  };
  const encoded = btoa(JSON.stringify(flowData));
  const url = `${window.location.origin}${window.location.pathname}?flow=${encoded}`;
  
  navigator.clipboard.writeText(url).then(() => {
    emit('notify', { message: 'Shareable link copied to clipboard!', type: 'success' });
  });
};
</script>
