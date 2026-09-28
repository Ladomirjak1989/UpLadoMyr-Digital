'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import { FaCheck, FaFileSignature, FaPalette, FaRocket } from 'react-icons/fa';

interface PaymentStep {
  number: string;
  percentage: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const paymentSteps: PaymentStep[] = [
  {
    number: '01',
    percentage: '50%',
    label: 'Project Start',
    title: 'Contract & Project Kickoff',
    description:
      'The first payment confirms your project and allows us to begin planning, preparation, and development.',
    icon: <FaFileSignature className="h-5 w-5" />,
  },
  {
    number: '02',
    percentage: '20%',
    label: 'Design Approval',
    title: 'Review & Confirmation',
    description:
      'Once the agreed design direction is reviewed and approved, the second project payment becomes due.',
    icon: <FaPalette className="h-5 w-5" />,
  },
  {
    number: '03',
    percentage: '30%',
    label: 'Final Delivery',
    title: 'Launch & Handover',
    description:
      'The remaining balance is paid when the agreed project is completed and ready for final delivery or launch.',
    icon: <FaRocket className="h-5 w-5" />,
  },
];

const PaymentSteps = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section
      className="
        relative
        mt-1
        w-full
        overflow-hidden
        rounded-sm
        bg-gradient-to-br
        from-[#071426]
        via-[#0b2347]
        to-[#102f5c]
        px-5
        py-14
        sm:px-8
        sm:py-16
        lg:px-12
        lg:py-20
        shadow-[0_30px_80px_rgba(15,23,42,0.18)]
      "
      data-aos="fade-up"
    >
      {/* ================= BACKGROUND DECORATION ================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-amber-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          -left-40
          h-[460px]
          w-[460px]
          rounded-full
          bg-blue-400/10
          blur-3xl
        "
        aria-hidden="true"
      />

      {/* Decorative grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-400/70" />

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-amber-300
              "
            >
              Simple & Transparent
            </p>

            <span className="h-px w-8 bg-amber-400/70" />
          </div>

          <h2
            className="
              mt-5
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-[3.4rem]
              font-bold
              leading-tight
              tracking-tight
              text-white
            "
          >
            Clear Payment Stages.{' '}
            <span
              className="
                bg-gradient-to-r
                from-[#d89b2a]
                via-[#f0cb58]
                to-[#c07a18]
                bg-clip-text
                text-transparent
              "
            >
              No Surprises.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              sm:text-lg
              leading-8
              text-white/65
            "
          >
            Project payments are divided into clear milestones, so you know when each payment is due
            and what stage of the project it corresponds to.
          </p>
        </div>

        {/* ================= PAYMENT SUMMARY ================= */}

        <div
          className="
            mx-auto
            mt-9
            flex
            w-fit
            max-w-full
            flex-wrap
            items-center
            justify-center
            gap-x-3
            gap-y-2
            rounded-full
            border
            border-white/10
            bg-white/[0.05]
            px-5
            py-3
            text-xs
            sm:text-sm
            text-white/60
            backdrop-blur-md
          "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="font-bold text-amber-300">50%</span>
          <span>Project Start</span>

          <span className="text-white/20">•</span>

          <span className="font-bold text-amber-300">20%</span>
          <span>Design Approval</span>

          <span className="text-white/20">•</span>

          <span className="font-bold text-amber-300">30%</span>
          <span>Final Delivery</span>
        </div>

        {/* ================= PAYMENT TIMELINE ================= */}

        <div className="relative mt-14 lg:mt-16">
          {/* Desktop connecting line */}
          <div
            className="
              pointer-events-none
              absolute
              left-[16.66%]
              right-[16.66%]
              top-[32px]
              hidden
              h-px
              bg-gradient-to-r
              from-transparent
              via-amber-400/50
              to-transparent
              lg:block
            "
            aria-hidden="true"
          />

          {/* Mobile connecting line */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-20
              left-[31px]
              top-10
              w-px
              bg-gradient-to-b
              from-amber-400/50
              via-amber-400/25
              to-transparent
              lg:hidden
            "
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
            {paymentSteps.map((step, index) => (
              <article
                key={step.number}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                {/* Timeline number */}
                <div
                  className="
                    relative
                    z-20
                    mb-5
                    ml-2
                    flex
                    h-[64px]
                    w-[64px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-amber-300/40
                    bg-[#0b2347]
                    shadow-[0_0_0_8px_rgba(245,190,70,0.05),0_8px_30px_rgba(0,0,0,0.25)]
                    lg:mx-auto
                  "
                >
                  <span
                    className="
                      bg-gradient-to-br
                      from-[#f5d36b]
                      via-[#dcae35]
                      to-[#a45e12]
                      bg-clip-text
                      text-sm
                      font-extrabold
                      text-transparent
                    "
                  >
                    {step.number}
                  </span>
                </div>

                {/* Payment card */}
                <div
                  className="
                    group
                    relative
                    ml-16
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/10
                    bg-white/[0.06]
                    p-6
                    backdrop-blur-md
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-amber-300/30
                    hover:bg-white/[0.09]
                    hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)]
                    lg:ml-0
                    lg:p-7
                  "
                >
                  {/* Hover glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-44
                      w-44
                      rounded-full
                      bg-amber-400/0
                      blur-3xl
                      transition-all
                      duration-500
                      group-hover:bg-amber-400/10
                    "
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Icon + percentage */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-amber-300/20
                          bg-amber-400/10
                          text-amber-300
                        "
                      >
                        {step.icon}
                      </div>

                      <div className="text-right">
                        <p
                          className="
                            text-3xl
                            sm:text-4xl
                            font-black
                            tracking-tight
                            text-white
                          "
                        >
                          {step.percentage}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.17em]
                            text-white/35
                          "
                        >
                          Payment
                        </p>
                      </div>
                    </div>

                    {/* Label */}
                    <p
                      className="
                        mt-7
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.18em]
                        text-amber-300
                      "
                    >
                      {step.label}
                    </p>

                    {/* Title */}
                    <h3
                      className="
                        mt-2
                        text-xl
                        sm:text-2xl
                        font-bold
                        leading-snug
                        text-white
                      "
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        mt-4
                        text-sm
                        leading-7
                        text-white/60
                      "
                    >
                      {step.description}
                    </p>

                    {/* Status */}
                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        border-t
                        border-white/10
                        pt-5
                        text-xs
                        font-semibold
                        text-white/50
                      "
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center
                          rounded-full
                          bg-amber-400/10
                          text-amber-300
                        "
                      >
                        <FaCheck className="h-2.5 w-2.5" />
                      </span>
                      Milestone-based payment
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ================= TRANSPARENT TERMS ================= */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-4
            rounded-[26px]
            border
            border-white/10
            bg-black/10
            p-5
            sm:p-6
            md:grid-cols-[1fr_auto]
            md:items-center
            md:gap-8
          "
          data-aos="fade-up"
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.17em]
                text-amber-300
              "
            >
              Transparent From the Beginning
            </p>

            <p
              className="
                mt-2
                max-w-3xl
                text-sm
                sm:text-base
                leading-7
                text-white/65
              "
            >
              Payment terms, project scope, deliverables, and milestones are agreed before work
              begins, giving both sides a clear understanding of the project from day one.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-amber-300/20
              bg-amber-400/[0.07]
              px-5
              py-4
            "
          >
            <span className="text-3xl font-black text-amber-300">100%</span>

            <div>
              <p className="text-sm font-bold text-white">Clear Structure</p>

              <p className="mt-0.5 text-xs text-white/45">From kickoff to delivery</p>
            </div>
          </div>
        </div>

        {/* ================= FLEXIBLE PAYMENT OPTIONS ================= */}

        <div
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[26px]
            border
            border-amber-300/20
            bg-gradient-to-r
            from-amber-400/[0.08]
            via-white/[0.04]
            to-amber-400/[0.08]
            p-5
            sm:p-6
            md:p-7
          "
          data-aos="fade-up"
        >
          {/* Decorative glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-amber-400/10
              blur-3xl
            "
            aria-hidden="true"
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* Left */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-amber-300/20
                    bg-amber-400/10
                    text-lg
                    font-black
                    text-amber-300
                  "
                >
                  %
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-amber-300
                    "
                  >
                    Flexible Payment Options
                  </p>

                  <h3
                    className="
                      mt-1
                      text-lg
                      sm:text-xl
                      font-bold
                      text-white
                    "
                  >
                    A Payment Schedule That Can Fit Your Project
                  </h3>
                </div>
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  leading-7
                  text-white/65
                "
              >
                For selected projects, a more flexible installment plan can be discussed. Instead of
                following the standard payment schedule, the total project cost may be divided into
                additional agreed milestones based on the project scope, timeline, and budget.
              </p>
            </div>

            {/* Available on request */}
            <div
              className="
                shrink-0
                rounded-2xl
                border
                border-amber-300/20
                bg-[#071426]/50
                px-5
                py-4
                md:max-w-[220px]
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-amber-300
                "
              >
                Available on Request
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-white/50
                "
              >
                Flexible terms are discussed individually and agreed before development begins.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FINAL NOTE ================= */}

        <p
          className="
            mx-auto
            mt-6
            max-w-3xl
            text-center
            text-xs
            sm:text-sm
            leading-6
            text-white/35
          "
        >
          The standard 50% / 20% / 30% payment structure applies unless alternative terms are agreed
          in writing before the project begins.
        </p>

        {/* ================= CALL TO ACTION ================= */}

        <div
          className="
    relative
    mt-10
    overflow-hidden
    rounded-[28px]
    border
    border-white/10
    bg-white/[0.045]
    px-6
    py-8
    sm:px-8
    sm:py-9
    lg:px-10
  "
          data-aos="fade-up"
        >
          {/* Background glow */}
          <div
            className="
      pointer-events-none
      absolute
      -right-24
      -top-24
      h-56
      w-56
      rounded-full
      bg-amber-400/10
      blur-3xl
    "
            aria-hidden="true"
          />

          <div
            className="
      relative
      z-10
      flex
      flex-col
      gap-7
      lg:flex-row
      lg:items-center
      lg:justify-between
    "
          >
            {/* Text */}
            <div className="max-w-2xl">
              <p
                className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-amber-300
        "
              >
                Have a Project in Mind?
              </p>

              <h3
                className="
          mt-3
          text-2xl
          sm:text-3xl
          font-bold
          leading-tight
          tracking-tight
          text-white
        "
              >
                Let&apos;s Discuss Your Project and Payment Options
              </h3>

              <p
                className="
          mt-3
          max-w-xl
          text-sm
          sm:text-base
          leading-7
          text-white/60
        "
              >
                Tell us about your project, requirements, timeline, and budget. We&apos;ll discuss
                the right development approach, estimated scope, and a payment structure that works
                for your project.
              </p>
            </div>

            {/* CTA */}
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <Link
                href="/contacts"
                className="
          group
          inline-flex
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-amber-950
          bg-gradient-to-br
          from-blue-950
          via-blue-900
          to-blue-800
          px-7
          py-3.5
          text-sm
          font-extrabold
          text-amber-400
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:from-[#767675]
          hover:via-[#efc741]
          hover:to-[#904e0d]
          hover:text-blue-950
          hover:shadow-xl
        "
              >
                Discuss Your Project
                <span
                  className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
                >
                  →
                </span>
              </Link>

              <p className="text-xs text-white/35">
                No obligation — start with a project discussion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSteps;
