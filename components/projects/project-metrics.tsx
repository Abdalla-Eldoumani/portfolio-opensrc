"use client";

import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Users, TrendingUp, Activity, Zap } from 'lucide-react';
import type { ProjectMetrics as ProjectMetricsType } from '@/lib/types/portfolio';

interface ProjectMetricsProps {
  stats: ProjectMetricsType;
}

/**
 * Project Metrics Component
 * Displays project statistics with animated counters
 */
export const ProjectMetrics = ({ stats }: ProjectMetricsProps) => {
  const metricsList = [
    ...(stats.requests ? [{ label: 'Requests', value: stats.requests.toLocaleString(), icon: Users, color: 'text-cyan-400', suffix: '+' }] : []),
    ...(stats.responseTime ? [{ label: 'Response Time', value: stats.responseTime, icon: Zap, color: 'text-orange-400', suffix: 'ms' }] : []),
    ...(stats.cacheReduction ? [{ label: 'Cache Reduction', value: stats.cacheReduction, icon: TrendingUp, color: 'text-emerald-400', suffix: '%' }] : []),
    ...(stats.performanceGain ? [{ label: 'Performance Gain', value: stats.performanceGain, icon: Activity, color: 'text-purple-400', suffix: '%' }] : []),
    ...(stats.iterations ? [{ label: 'Iterations', value: stats.iterations.toLocaleString(), icon: TrendingUp, color: 'text-emerald-400', suffix: '+' }] : []),
  ];

  if (metricsList.length === 0) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-gray-200">Key Metrics</h4>
      <div className="grid grid-cols-2 gap-4">
        {metricsList.map((metric, index) => {
          const Icon = metric.icon;
          const numericValue = typeof metric.value === 'string' ? parseFloat(metric.value.replace(/,/g, '')) : metric.value;

          return (
            <div key={index} className="glass-effect p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Icon className={`w-4 h-4 ${metric.color} mr-2`} />
                <span className="text-xs text-gray-400 uppercase tracking-wide">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter value={numericValue} suffix={metric.suffix} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
