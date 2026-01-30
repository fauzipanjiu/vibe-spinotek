<template>
  <aside class="w-72 h-full border-r border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex flex-col z-40 transition-all duration-500 relative">
    <!-- Decorative side accent -->
    <div class="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

    <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div v-for="(group, gIndex) in groupedLibrary" :key="group.category" 
           :class="{'mt-10': gIndex > 0}">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-1 h-3 bg-blue-500 rounded-full"></div>
          <h2 class="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-[0.25em] opacity-80">{{ group.category }}</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div 
            v-for="item in group.items" 
            :key="item.type"
            draggable="true"
            @dragstart="onDragStart($event, item.type)"
            class="group cursor-grab active:cursor-grabbing"
          >
            <div class="relative aspect-square bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group-active:scale-95">
              <!-- Glow background effect -->
              <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
              
              <component :is="item.icon" class="w-7 h-7 text-slate-400 dark:text-white/40 group-hover:text-blue-500 dark:group-hover:text-blue-400 mb-3 transition-colors duration-300" />
              <span class="text-[9px] font-black text-slate-500 dark:text-white/50 uppercase tracking-tighter group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-center">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto p-6 border-t border-slate-100 dark:border-white/5 relative overflow-hidden">
      <!-- High-Tech Scan Line Animation -->
      <div class="absolute top-0 left-0 right-0 h-[1px] bg-blue-500/20 animate-scan pointer-events-none"></div>

      <a href="https://spinotek.com" target="_blank" class="block group/cta relative">
        <div class="absolute -inset-2 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700"></div>
        
        <div class="relative p-5 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover/cta:border-blue-500/40 group-hover/cta:-translate-y-2 overflow-hidden">
          <!-- Glass Overlay for depth -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent pointer-events-none"></div>
          
          <div class="flex items-center gap-3 mb-4">
            <div class="relative w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover/cta:scale-110 transition-transform duration-500 shadow-inner">
               <img src="/assets/images/favicon.png" alt="Spinotek" class="w-6 h-6 object-contain" />
               <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-black animate-pulse"></div>
            </div>
            <div class="flex flex-col">
               <span class="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Spinotek</span>
               <span class="text-[7px] font-black text-blue-500 uppercase tracking-widest leading-none">Systems Architect</span>
            </div>
          </div>

          <p class="text-[11px] text-slate-600 dark:text-white/50 leading-relaxed font-semibold mb-4">
            Build Your <span class="relative inline-block mx-0.5"><span class="absolute bottom-0.5 left-0 right-0 h-[35%] bg-blue-500/20 dark:bg-blue-500/40 -skew-x-12 rounded-sm border-r-2 border-blue-500/50"></span><span class="relative text-slate-900 dark:text-white font-black italic">Digital Empire</span></span>. Let us transform your complex ideas into high-performance systems.
          </p>

          <div class="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all group-hover/cta:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <span class="text-[9px] font-black uppercase tracking-widest flex-1">Launch Project</span>
            <ExternalLinkIcon class="w-3 h-3" />
          </div>
        </div>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { 
  LayoutIcon, UserIcon, LogInIcon, ClipboardListIcon, BarChart3Icon, 
  FileTextIcon, SettingsIcon, CreditCardIcon, CheckCircleIcon, MailIcon,
  SearchIcon, CalendarIcon, MapIcon, ActivityIcon, TagIcon, HelpCircleIcon,
  UploadIcon, ExternalLinkIcon, AlertCircleIcon, UserPlusIcon,
  FingerprintIcon, PieChartIcon, PlayCircleIcon, TerminalIcon, ReceiptIcon, HammerIcon
} from 'lucide-vue-next';

const groupedLibrary = [
  {
    category: 'Auth & Profile',
    items: [
      { type: 'login', label: 'Login', icon: LogInIcon },
      { type: 'register', label: 'Register', icon: UserPlusIcon },
      { type: 'profile', label: 'Profile', icon: UserIcon },
      { type: 'verify', label: 'OTP Verify', icon: FingerprintIcon },
    ]
  },
  {
    category: 'Dashboard & Feed',
    items: [
      { type: 'dashboard', label: 'Dashboard', icon: LayoutIcon },
      { type: 'analytics', label: 'Charts', icon: BarChart3Icon },
      { type: 'feed', label: 'Activity', icon: ActivityIcon },
      { type: 'stats', label: 'Stats Card', icon: PieChartIcon },
    ]
  },
  {
    category: 'Data & Content',
    items: [
      { type: 'list', label: 'List View', icon: ClipboardListIcon },
      { type: 'details', label: 'Details', icon: FileTextIcon },
      { type: 'search', label: 'Search', icon: SearchIcon },
      { type: 'calendar', label: 'Calendar', icon: CalendarIcon },
      { type: 'map', label: 'Map view', icon: MapIcon },
      { type: 'media', label: 'Video Player', icon: PlayCircleIcon },
    ]
  },
  {
    category: 'System & Tools',
    items: [
      { type: 'settings', label: 'Settings', icon: SettingsIcon },
      { type: 'messaging', label: 'Inbox', icon: MailIcon },
      { type: 'upload', label: 'Upload', icon: UploadIcon },
      { type: 'modal', label: 'Modal', icon: ExternalLinkIcon },
      { type: 'terminal', label: 'Console', icon: TerminalIcon },
    ]
  },
  {
    category: 'Business',
    items: [
      { type: 'payment', label: 'Checkout', icon: CreditCardIcon },
      { type: 'pricing', label: 'Pricing', icon: TagIcon },
      { type: 'invoice', label: 'Invoice', icon: ReceiptIcon },
    ]
  },
  {
    category: 'Status & Help',
    items: [
      { type: 'success', label: 'Success', icon: CheckCircleIcon },
      { type: 'error', label: 'Error State', icon: AlertCircleIcon },
      { type: 'faq', label: 'FAQ', icon: HelpCircleIcon },
      { type: 'maintenance', label: 'Service', icon: HammerIcon },
    ]
  }
];

const onDragStart = (e, type) => {
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('application/spinotek-block', type);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.2);
}
@keyframes scan {
  0% { transform: translateY(-100px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(300px); opacity: 0; }
}
.animate-scan {
  animation: scan 4s linear infinite;
}
</style>
